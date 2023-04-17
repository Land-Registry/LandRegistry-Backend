# Write a program to implement KNN
# randomly generate a data of 20 points having x and y values, also assign positive value when x or y component is below 26 and negative value to all other input data. Perform classification by using value of K = 1, 2, 3, 4, 5.

from operator import indexOf
import random
import math
MAX = 999

class node():
    def __init__(self, x, y):
        self.x = x
        self.y = y
        if(x<26 or y<26):
            self.value = 'Positive'
        else:
            self.value = 'Negative'
        

k = [1,2,3,4,5]
data = []
for i in range(20):
    x = random.randint(0,100)
    y = random.randint(0,100)
    a = node(x, y)
    data.append(a)

def distance(m, n):
    d = math.sqrt((m.x-n.x)**2 + (m.y-n.y)**2)
    return d

test = node(12, 12)
dd = []
for j in range(len(data)):
        x = distance(test, data[j])
        dd.append(x)

for i in range(1,6):
    n = 0
    p = 0
    print("K = ", i)
    d = dd
    for k in range(i):
        v = indexOf(d, min(d))
        # print('(',data[v].x, data[v].y,")",end="")
        d[v] = MAX
        if(data[v].value=='Positive'):
            p+=1
        else:
            n+=1
    # print("\n")

            
    if(p>n):
        test.value = 'Positive'
        print("Value: ", test.value)
    elif(p<n):
        test.value = 'Negative'
        print("Value:", test.value)
    else:
        print("Value cannot be determined.")