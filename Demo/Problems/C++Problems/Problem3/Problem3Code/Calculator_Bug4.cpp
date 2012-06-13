#include <iostream>
#include <fstream>
using namespace std;

double doAdd(double num1,double num2)
{
	/*
   double answer = 0;
   for (int i = 0; i < num2; i++)
   {
       answer+=1;
   }
   return answer;*/
	return num1 + num2;
}
   
double doSubtract(double num1, double num2)
{
   return num1 - num2;
}
  
double doMultiply(double num1, double num2)
{
	
   double answer = num1;
   for (int i = 0; i <= num2; i++)
   {
       answer*=num1;
   }
   return answer;
	//return num1 * num2;
}
   
double doDivide(double num1, double num2)
{
   return num1 / num2;
}

double doTheMath(double num1, double num2, char* sign)
{
   double answer = 0;
   if (strcmp("plus", sign)== 0)
   	answer = doAdd(num1, num2);
   if (strcmp("minus", sign)== 0)
       answer = doSubtract(num1, num2);
   if (strcmp("over", sign)== 0)
       answer = doDivide(num1, num2);
   if (strcmp("times", sign)== 0)
       answer = doMultiply(num1, num2);
   return answer;
}
   
int main(int argc, char* argv[])
{
   double num = atoi(argv[1]);
   char* str = argv[2]; 
   double num1 = atoi(argv[3]);
   double answer = doTheMath(num, num1, str);
   //ofstream outfile("output.txt");
   cout << answer;
   //outfile.close();
   return 0;
}
