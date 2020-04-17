import random
from noobai import makemove

class CommandManager:

    def __init__(self):
        self.input_message = str()
        self.boardsize = 19
        while (self.input_message != "END"):
            self.input_message = input().upper()
            self.command = self.input_message.split()
            self.executecmd()
        
    def executecmd(self):
        if self.command[0] == "START":
            try:
                self.boardsize = int(self.command[1])
                self.startcmd(self.boardsize)            
            except:
                print("Enter a valid boardsize after START")
        if self.command[0] == "RESTART":
            try:
                self.startcmd(self.boardsize)            
            except:
                print("Enter a valid boardsize after START")
        if self.command[0] == "TURN":
            try:
                self.turncmd(self.command[1])
            except:
                print("Enter validate coordinates")
        if self.command[0] == "BEGIN":
            try:
                self.begincmd()
            except:
                print("ERROR")
        if self.command[0] == "BOARD":
            try:
                self.boardcmd()
            except:
                print("ERROR BOARD")
        if self.command[0] == "PRINT":
            try:
                self.printBoard()
            except:
                print("ERROR PRINT")
        if self.command[0] == "ABOUT":
            try:
                print('name="Gomoku AI", version="1.0", author="ChrisVal", country="FR"')
            except:
                print("ERROR ABOUT")
                
    def startcmd(self, size):
        if size<5:
            print("ERROR message - unsupported size or other error")
        else:
            print("OK")
        self.Gameboard = []
        for i in range(size):
            self.Gameboard.append([0] * size)
        return self.Gameboard
    
    def turncmd(self, coordinate):
        x = int(coordinate.split(",")[0])
        y = int(coordinate.split(",")[1])
        self.Gameboard[y][x] = 2
        makemove(self.boardsize, self.Gameboard)

    def begincmd(self):
        x = round(self.boardsize/2)
        y = round(self.boardsize/2)
        print("{},{}".format(x,y))
        self.Gameboard[y][x] = 1
    
    def printBoard(self):
        for x in self.Gameboard:
            print(x)

    def makerandommove(self):
        condition = 1
        while condition:
            x = random.randint(0, self.boardsize - 1)
            y = random.randint(0, self.boardsize - 1)
            if self.Gameboard[y][x] == 0:
                self.Gameboard[y][x] = 1
                print("{},{}".format(x,y))
                condition = 0

    def boardcmd(self):
        self.Gameboard = []
        for i in range(self.boardsize):
            self.Gameboard.append([0] * self.boardsize)
        board_input = input().upper()
        while (board_input != "DONE"):
            board_split = board_input.split(",")
            self.Gameboard[int(board_split[1])][int(board_split[0])] = int(board_split[2])
            board_input = input().upper()
        self.makerandommove()
        return self.Gameboard
    
        
    
    
        
    
    
    
    