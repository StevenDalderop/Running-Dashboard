import pandas as pd
import datetime 
import os 
      
def parse_csv(filepath):        
    df = pd.read_csv(filepath)
    df = df[((df["Message"] == "session")|(df["Message"] == "record")|(df["Message"] == "lap"))&(df["Type"]=="Data")]
    cols_fvu = pd.Series(df.columns.tolist()[3:-1]) # all columns starting with field, value or unit 
    cols_f = cols_fvu[cols_fvu.apply(lambda x: x.startswith("F"))]   
    cols_v = cols_fvu[cols_fvu.apply(lambda x: x.startswith("V"))]    
    df_f = df[cols_f]
    df_v = df[cols_v]

    # initial df with same columns as first row
    df_f = df_f.fillna(-1)
    index = (df_f.values == df_f.values[0]).all(axis = 1)
    df_new = df_v[index]
    df_new.columns = df_f[index].values[0]
    try:
        del df_new[-1] # delete columns with nan values
    except:
        pass
    
    # the rest of the df   
    while True:
        df_f = df_f[~index]
        if len(df_f) == 0:
            break
        index = (df_f.values == df_f.values[0]).all(axis =1)
        df_new2 = df_v.loc[df_f[index].index]
        df_new2.columns = df_f.loc[df_f[index].index].values[0]
        try:
            del df_new2[-1]
        except:
            pass
        df_new = pd.concat([df_new, df_new2], axis = 0, join = "outer", sort = False)
    
    df_new = df_new.sort_index()
    df_new["Message"] = df["Message"]
    time_correction_function = lambda x: datetime.datetime.fromtimestamp(x + 631065600 ) if pd.notna(x) else x 
    df_new["timestamp"] = df_new["timestamp"].apply(time_correction_function) # correction because it starts at certain date
    df_new["start_time"] = df_new["start_time"].apply(time_correction_function) # garmin specific     
    filename = os.path.basename(filepath)
    df_new["name"] = [filename] * len(df_new)
    df_new["speed"] = df_new["speed"] * 3.6
    df_new["speed"] = df_new["speed"].apply(lambda x: min(x, 25))
    df_new["avg_speed"] = df_new["avg_speed"] * 3.6
    df_new["jaar"] = df_new["start_time"].apply(lambda x: x.year)
    df_new["maand"] = df_new["start_time"].apply(lambda x: x.month)
    df_new["week"] = df_new["start_time"].apply(lambda x: x.week)
    df_new["dag"] = df_new["start_time"].apply(lambda x: x.day)
    df_new["uur"] = df_new["start_time"].apply(lambda x: x.hour)  
    df_new["total_timer_time"] = df_new["total_timer_time"] / 60 
    try:
        df_new["position_lat"] = df_new["position_lat"] * 180 / 2 ** 31
        df_new["position_long"] = df_new["position_long"] * 180 / 2 ** 31
    except:
        pass
    try: 
        df_new["start_position_lat"] = df_new["start_position_lat"] * 180 / 2 ** 31
        df_new["start_position_long"] = df_new["start_position_long"] * 180 / 2 ** 31
        df_new["end_position_lat"] = df_new["end_position_lat"] * 180 / 2 ** 31
        df_new["end_position_long"] = df_new["end_position_long"] * 180 / 2 ** 31
    except:
        pass
    df_new["distance"] = df_new["distance"] / 1000
    df_new["total_distance"] = df_new["total_distance"] / 1000
    df_new = df_new.where(pd.notnull(df_new), None)
    return df_new
