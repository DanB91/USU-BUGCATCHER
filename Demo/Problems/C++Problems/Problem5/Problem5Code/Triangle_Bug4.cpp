#include <iostream>
#include <string>
#include <fstream>
using namespace std;

static int RIGHTANGLE = 90, SUMTRIANGLEANGLE = 180;

class Triangle {
public:
  int firstAngle, secondAngle, thirdAngle;
    
  /*Determine which angle is the biggest one*/
  static int biggest(int angle1, 
                      int angle2, int angle3){
   if(((angle1 <= angle2)&&(angle2 >= angle3))
     ||((angle2 >= angle1)&&(angle1 <= angle3)))
         return angle3;
   else if (((angle1 <= angle3)
                          &&(angle3 <= angle2))
     ||((angle3 <= angle1)&&(angle1 <= angle2)))
         return angle2;
   else
      return angle1;
  }
  /*find what kinds of triangle*/
  string findTriangleType(){
   int bigAngle = biggest(firstAngle, 
                    secondAngle, thirdAngle);
   int sum = firstAngle + secondAngle + thirdAngle;
   if (sum != SUMTRIANGLEANGLE)
       return "Not a Triangle";
   else if (bigAngle > RIGHTANGLE)
       return "Obtuse";
   else if (bigAngle == RIGHTANGLE)
       return "Right";
   else
       return "Acute";        
  }
  /*constructor*/
  Triangle(int angle1, int angle2, int angle3)
  {
    firstAngle = angle1;
    secondAngle = angle2;
    thirdAngle = angle3;
  }
};
int main(int argc, char* argv[]) {
        
    int angle1 = atoi(argv[1]);
    int angle2 = atoi(argv[2]);
    int angle3 = atoi(argv[3]);
      
    if(angle1 <= 0 || angle2 <= 0 ||angle3 <= 0){
     cout << "Invalid Input Value(s)\n";
        return 0;        
    } 
        
    Triangle tr(angle1, angle2, angle3);
	//ofstream outfile("output.txt");
	cout << tr.findTriangleType(); 
	//outfile.close();        
	
} 