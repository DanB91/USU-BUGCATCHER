#include <iostream>
#include <string>
#include <fstream>
using namespace std;

void convertSecsToTime(double sec)
 {
  double seconds = sec;
  int minutes = 0;
  int hours = 0;
  int days = 0;
  bool secondsFixed = false;
  bool minutesFixed = false;
  bool hoursFixed = false;
  while (secondsFixed == false || 
      minutesFixed == false || hoursFixed == false)
  {
    if (seconds < 0.0)
        cout << "Error: Bad input";
    if (seconds >= 60.0)
    {
       seconds-=60;
       minutes+=1;
    }
    if (minutes >= 60)
    {
        minutes-=60;
        hours+=1;
    }
    if (hours>=24)
    {
        hours -=24;
        days +=1;
    }
    if (seconds <60.0 && minutes < 60 && hours < 24)
       secondsFixed = true;
       minutesFixed = true;
       hoursFixed = true;
  }
 
 // ofstream outfile("output.txt");
  cout << days << ":" << hours << ":" << minutes << ":" << seconds;
  //outfile.close();
         
 }	
          
int main(int argc, char* argv[]) {
   double num = atoi(argv[1]);
   convertSecsToTime(num);
   
   return 0;
 } 