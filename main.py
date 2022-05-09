from cmd_tool.utils import import_files_from_usb, extract_new_files, update_database, get_info
import sys


def main():
    if len(sys.argv) != 2:
        print("Expected 2 arguments. Correct usage: python main.py [command] \nPossible commands are: import / extract / update / info")
        return 

    command = sys.argv[1]

    if command == "import":
        import_files_from_usb()
    elif command == "extract":
        extract_new_files()
    elif command == "update":
        update_database()
    elif command == "info":
        get_info()
    else: 
        print("Invalid command")

    return 


if __name__ == "__main__":
    main()
