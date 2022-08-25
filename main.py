from cmd_tool.utils import copy_files_from_usb, extract_new_files, add_competitions_to_db, get_info
import sys


def main():
    if len(sys.argv) != 2:
        print("Expected 2 arguments. Correct usage: python main.py [command] \nPossible commands are: copy / extract / update / info")
        return 

    command = sys.argv[1]

    if command == "copy":
        copy_files_from_usb()
    elif command == "extract":
        extract_new_files()
    elif command == "update":
        add_competitions_to_db()
    elif command == "info":
        get_info()
    else: 
        print("Invalid command")

    return 


if __name__ == "__main__":
    main()
