# -*- coding: utf-8 -*-

def EvalScore(consecutive, openEnds, player):
    if (openEnds == 0):
        return 0
    if (consecutive == 4):
        if (player == 2):
            if (openEnds == 2):
                return -2000000
            if (openEnds == 1):
                return -1500000
        if (player == 1):
            if (openEnds>0):
                return 5000000
    if (consecutive == 3):
        if (player == 1):
            if (openEnds == 2):
                return 1000000
            if (openEnds == 1):
                return 500000
        if (player == 2):
            if (openEnds == 2):
                return -200000
            if (openEnds == 1):
                return -100000
    if (consecutive == 2):
        if (player == 1):
            if (openEnds == 2):
                return 10000
            if (openEnds == 1):
                return 5000
        if (player == 2):
            if (openEnds == 2):
                return -9000
            if (openEnds == 1):
                return -4000
    if (consecutive == 1):
        if (player == 1):
            if (openEnds == 1):
                return 500
            if (openEnds == 2):
                return 1000
        if (player == 2):
            if (openEnds == 1):
                return -400
            if (openEnds == 2):
                return -900
    else:
        return 0
    
def checkHorizontal(boardSize, gameBoard, player):
    """ function that evaluates horizontal move """
    score = 0
    countConsecutive = 0
    openEnds = 0
    final_score = 0
    x = 0
    y = 0
    
    for i in range(boardSize):
        for a in range(boardSize):
            if (gameBoard[i][a] == player):
                countConsecutive+=1
            elif (gameBoard[i][a] == 0 and countConsecutive > 0):
                openEnds+=1
                score = EvalScore(countConsecutive,openEnds,player)
                if (player == 1 and score>final_score):
                    final_score = score
                    x = a
                    y = i
                elif(player == 2 and score<final_score):
                    final_score = score
                    x = a
                    y = i                    
                countConsecutive = 0
                openEnds = 1
            elif (gameBoard[i][a] != (player and 0)  and countConsecutive > 0 and openEnds==1):
                score = EvalScore(countConsecutive,openEnds, player)
                if (player == 1 and score>final_score):
                    final_score = score
                    x = a-countConsecutive - 1
                    y = i
                if (player == 2 and score<final_score):
                    final_score = score
                    x = a-countConsecutive - 1
                    y = i
                countConsecutive = 0
                openEnds = 0
            elif (gameBoard[i][a] == 0):
                openEnds = 1
            else:
                openEnds = 0
                countConsecutive = 0
        openEnds=0
    return [final_score, x, y]

def checkVertical(boardSize, gameBoard, player):
    """ function that evaluates vertical move """
    score = 0
    countConsecutive = 0
    openEnds = 0
    final_score = 0
    x = 0
    y = 0
    
    for i in range(boardSize):
        for a in range(boardSize):
            if (gameBoard[a][i] == player):
                countConsecutive+=1
            elif (gameBoard[a][i] == 0 and countConsecutive > 0):
                openEnds+=1
                score = EvalScore(countConsecutive,openEnds,player)
                if (player == 1 and score>final_score):
                    final_score = score
                    x = i
                    y = a
                if (player == 2 and score<final_score):
                    final_score = score
                    x = i
                    y = a
                countConsecutive = 0
                openEnds = 1
            elif (gameBoard[a][i] != (player and 0) and countConsecutive > 0 and openEnds==1):
                score = EvalScore(countConsecutive,openEnds,player)
                if (player == 1 and score>final_score):
                    final_score = score
                    x = i
                    y = a-countConsecutive - 1
                if (player == 2 and score<final_score):
                    final_score = score
                    x = i
                    y = a-countConsecutive - 1
                countConsecutive = 0
                openEnds = 0
            elif (gameBoard[a][i] == 0):
                openEnds = 1
            else:
                openEnds = 0
                countConsecutive = 0
        openEnds=0
    return [final_score, x, y]

def checkDiagonal(boardSize, gameBoard, player):
    """ function that evaluates diagonal move """

    score = 0
    countConsecutive = 0
    openEnds = 0
    final_score = 0
    x = 0
    y = 0
    
    """ straight loop 1 """
    for i in range(boardSize):
        for a in range(boardSize-i):
            if (gameBoard[a][i+a] == player):
                countConsecutive+=1
            elif (gameBoard[a][i+a] != (player and 0) and countConsecutive > 0 and openEnds== 1):
                score = EvalScore(countConsecutive,openEnds,player)
                if (player == 1 and score>final_score):
                    final_score = score
                    x = i+a-countConsecutive - 1
                    y = a-countConsecutive - 1
                if (player == 2 and score<final_score):
                    final_score = score
                    x = i+a-countConsecutive - 1
                    y = a-countConsecutive - 1
                countConsecutive = 0
                openEnds = 0
            elif (gameBoard[a][i+a] == 0 and countConsecutive > 0):
                openEnds+=1
                score = EvalScore(countConsecutive,openEnds,player)
                if (player == 1 and score>final_score):
                    final_score = score
                    x = i+a
                    y = a
                if (player == 2 and score<final_score):
                    final_score = score
                    x = i+a
                    y = a
                countConsecutive = 0
                openEnds = 1
            elif (gameBoard[a][i+a] == 0):
                openEnds = 1
            else:
                countConsecutive = 0
                openEnds = 0
        openEnds=0
        """ straight loop 2 """
    for i in range(1,boardSize):
        for a in range(boardSize-i):
            if (gameBoard[i+a][a] == player):
                countConsecutive+=1
            elif (gameBoard[i+a][a] != (player and 0) and countConsecutive > 0 and openEnds==1):
                score = EvalScore(countConsecutive,openEnds,player)
                if (player == 1 and score>final_score):
                    final_score = score
                    x = a - countConsecutive - 1
                    y = i+a - countConsecutive - 1
                if (player == 2 and score<final_score):
                    final_score = score
                    x = a - countConsecutive - 1
                    y = i+a - countConsecutive - 1                   
                countConsecutive = 0
                openEnds = 0          
            elif (gameBoard[i+a][a] == 0 and countConsecutive > 0):
                openEnds+=1
                score = EvalScore(countConsecutive,openEnds,player)
                if (player == 1 and score>final_score):
                    final_score = score
                    x = a
                    y = i+a
                if (player == 2 and score<final_score):
                    final_score = score
                    x = a
                    y = i+a
                countConsecutive = 0
                openEnds = 1
            elif (gameBoard[i+a][a] == 0):
                openEnds = 1
            else:
                countConsecutive = 0
                openEnds = 0
        openEnds=0
        """ reverse loop 1 """
    for i in range(boardSize-1,-1,-1):
        for a in range(i+1):
            if (gameBoard[a][i-a] == player):
                countConsecutive+=1
            elif (gameBoard[a][i-a] != (player and 0) and countConsecutive > 0 and openEnds== 1):
                score = EvalScore(countConsecutive,openEnds,player)
                if (player == 1 and score>final_score):
                    final_score = score
                    x = i-a+countConsecutive + 1
                    y = a-countConsecutive - 1
                if (player == 2 and score<final_score):
                    final_score = score
                    x = i-a+countConsecutive + 1
                    y = a-countConsecutive - 1
                countConsecutive = 0
                openEnds = 0              
            elif (gameBoard[a][i-a] == 0 and countConsecutive > 0):
                openEnds+=1
                score = EvalScore(countConsecutive,openEnds,player)
                if (player == 1 and score>final_score):
                    final_score = score
                    x = i-a
                    y = a
                if (player == 2 and score<final_score):
                    final_score = score
                    x = i-a
                    y = a                   
                countConsecutive = 0
                openEnds = 1
            elif (gameBoard[a][i-a] == 0):
                openEnds = 1
            else:
                countConsecutive = 0
                openEnds = 0
        openEnds=0
        """ reverse loop 2 """
    for i in range(1,boardSize):
        for a in range(boardSize-1, i-1, -1):
            if (gameBoard[i+(boardSize-1-a)][a] == player):
                countConsecutive+=1
            elif (gameBoard[i+(boardSize-1-a)][a] != (player and 0) and countConsecutive > 0 and openEnds==1):
                score = EvalScore(countConsecutive,openEnds,player)
                if (player == 1 and score>final_score):
                    final_score = score
                    x = a + countConsecutive + 1
                    y = i+(boardSize-1-a) - countConsecutive - 1
                if (player == 2 and score<final_score):
                    final_score = score
                    x = a + countConsecutive + 1
                    y = i+(boardSize-1-a) - countConsecutive - 1
                countConsecutive = 0
                openEnds = 0          
            elif (gameBoard[i+(boardSize-1-a)][a] == 0 and countConsecutive > 0):
                openEnds+=1
                score = EvalScore(countConsecutive,openEnds,player)
                if (player == 1 and score>final_score):
                    final_score = score
                    x = a
                    y = i+(boardSize-1-a)
                if (player == 2 and score<final_score):
                    final_score = score
                    x = a
                    y = i+(boardSize-1-a)
                countConsecutive = 0
                openEnds = 1
            elif (gameBoard[i+(boardSize-1-a)][a] == 0):
                openEnds = 1
            else:
                countConsecutive = 0
                openEnds = 0
        openEnds=0
    return [final_score, x, y]

def makemove(boardSize, gameBoard):
    count_1 = 0
    count_2 = 0
    for i in gameBoard:
        count_1 += i.count(1)
        count_2 += i.count(2)
    if count_1 == 0:
        x = round(boardSize/2)
        y = round(boardSize/2)
        if gameBoard[y][x] == 0:
            print("{},{}".format(x,y))
            gameBoard[y][x] = 1
        else:
            print("{},{}".format(x,y-1))
            gameBoard[y-1][x] = 1
        return (gameBoard)
    elif (count_1 == 1 and count_2 == 1):
        x = round(boardSize/2) + 1
        y = round(boardSize/2) + 1
        if gameBoard[y][x] == 0:
            print("{},{}".format(x,y))
            gameBoard[y][x] = 1
        else:
            print("{},{}".format(x-2,y-2))
            gameBoard[y-2][x-2] = 1
        return (gameBoard)
    else:
        AiHorizontalTup = checkHorizontal(boardSize, gameBoard,1)
        #print("AiHorizontalTup: {}".format(AiHorizontalTup))
        AiVerticalTup = checkVertical(boardSize, gameBoard,1)
        #print("AiVerticalTup: {}".format(AiVerticalTup))
        AiDiagonalTup = checkDiagonal(boardSize, gameBoard,1)
        #print("AiDiagonalTup: {}".format(AiDiagonalTup))
        OppHorizontalTup = checkHorizontal(boardSize, gameBoard,2)
        #print("OppHorizontalTup: {}".format(OppHorizontalTup))
        OppVerticalTup = checkVertical(boardSize, gameBoard,2)
        #print("OppVerticalTup: {}".format(OppVerticalTup))
        OppDiagonalTup = checkDiagonal(boardSize, gameBoard,2)
        #print("OppDiagonalTup: {}".format(OppDiagonalTup))
        DefOrAtt = AiHorizontalTup[0]+AiVerticalTup[0]+AiDiagonalTup[0]+OppHorizontalTup[0]+OppVerticalTup[0]+OppDiagonalTup[0]
        #print("DefOrAtt: {}".format(DefOrAtt))
        HighScore = max(AiHorizontalTup[0],AiVerticalTup[0],AiDiagonalTup[0])
        #print(HighScore)        
        MinScore = min(OppHorizontalTup[0],OppVerticalTup[0],OppDiagonalTup[0])
        #print(MinScore)
        if DefOrAtt>0:
            if HighScore in AiHorizontalTup:
                print("{},{}".format(AiHorizontalTup[1],AiHorizontalTup[2]))
                gameBoard[AiHorizontalTup[2]][AiHorizontalTup[1]] = 1
            elif HighScore in AiVerticalTup:
                print("{},{}".format(AiVerticalTup[1],AiVerticalTup[2]))
                gameBoard[AiVerticalTup[2]][AiVerticalTup[1]] = 1
            elif HighScore in AiDiagonalTup:
                print("{},{}".format(AiDiagonalTup[1],AiDiagonalTup[2]))
                gameBoard[AiDiagonalTup[2]][AiDiagonalTup[1]] = 1
        elif DefOrAtt<0:
            if MinScore in OppHorizontalTup:
                print("{},{}".format(OppHorizontalTup[1],OppHorizontalTup[2]))
                gameBoard[OppHorizontalTup[2]][OppHorizontalTup[1]] = 1
            elif MinScore in OppVerticalTup:
                print("{},{}".format(OppVerticalTup[1],OppVerticalTup[2]))
                gameBoard[OppVerticalTup[2]][OppVerticalTup[1]] = 1
            elif MinScore in OppDiagonalTup:
                print("{},{}".format(OppDiagonalTup[1],OppDiagonalTup[2]))
                gameBoard[OppDiagonalTup[2]][OppDiagonalTup[1]] = 1
        else:
            ExtremumDif = HighScore + MinScore
            if ExtremumDif>0:
                if HighScore in AiHorizontalTup:
                    print("{},{}".format(AiHorizontalTup[1],AiHorizontalTup[2]))
                    gameBoard[AiHorizontalTup[2]][AiHorizontalTup[1]] = 1
                elif HighScore in AiVerticalTup:
                    print("{},{}".format(AiVerticalTup[1],AiVerticalTup[2]))
                    gameBoard[AiVerticalTup[2]][AiVerticalTup[1]] = 1
                elif HighScore in AiDiagonalTup:
                    print("{},{}".format(AiDiagonalTup[1],AiDiagonalTup[2]))
                    gameBoard[AiDiagonalTup[2]][AiDiagonalTup[1]] = 1  
            elif ExtremumDif<=0:
                if MinScore in OppHorizontalTup:
                    print("{},{}".format(OppHorizontalTup[1],OppHorizontalTup[2]))
                    gameBoard[OppHorizontalTup[2]][OppHorizontalTup[1]] = 1
                elif MinScore in OppVerticalTup:
                    print("{},{}".format(OppVerticalTup[1],OppVerticalTup[2]))
                    gameBoard[OppVerticalTup[2]][OppVerticalTup[1]] = 1
                elif MinScore in OppDiagonalTup:
                    print("{},{}".format(OppDiagonalTup[1],OppDiagonalTup[2]))
                    gameBoard[OppDiagonalTup[2]][OppDiagonalTup[1]] = 1
        HighScore = 0
        MinScore = 0
        DefOrAtt = 0
        return (gameBoard)

def main():
    makemove(boardSize,gameBoard)

    
"""if __name__ == "__main__":
    main()"""