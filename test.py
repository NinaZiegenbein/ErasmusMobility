import numpy as np


a = [[0.0, 10.0, 30.0],
     [20.0, 0.0, 80.0],
     [30.0, 15.0, 0.0]]

def exp_val(matrix):
    exp_mat = matrix
    
    for i in matrix:
        x = 0
        y = 0
        edges = exp_val_one(i);
        for j in i:
            if j == 0:
                continue
            else:
                exp_mat[x][y] = exp_mat[x][y]/edges
            y += 1
        x += 1
    print(exp_mat)
    return exp_mat;
        
            
            
def exp_val_one(matrix):
    edges = 0;
    for i in matrix:
        if i != 0:
            edges += 1;
    return edges;

b = exp_val(a)