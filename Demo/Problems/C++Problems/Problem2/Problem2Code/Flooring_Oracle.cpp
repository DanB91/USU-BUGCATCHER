#include <iostream>
#include <string>
#include <iomanip>
#include <fstream>
using namespace std;

 static double shagCarpet = 1.00;
 static double linoleum = 2.50;
 static double hardwood = 5.00;
 static int SHAG = 1;
 static int LINO = 2;
 static int WOOD = 3;

class Flooring{
public:
 int length;
 int width;
 int type;
   
Flooring(double len, double wid, 
      int typ)
 {
   length = len;
   width = wid;
   type = typ;
 }
  
double computeArea(double len, double wid)
 {
   return len * wid/100;
 }
  
double price()
 {
   double area = computeArea(length, width);
   double price = area;
   if(type == SHAG)
      price *= shagCarpet;
   else if(type == LINO)
      price *= linoleum;
   else if (type == WOOD)
      price *= hardwood;
   return price/100;
 }
};

int main(int argc, char* argv[]) {
 int length = 0;
 int width = 0;
 int type = 0;
      
 length = atoi(argv[1])*100;
 width = atoi(argv[2])*100;
 type = atoi(argv[3]);

 if(length <= 0 || width <= 0 ||type <= 0 || 
      type > 3)
 {
   cout << "Invalid Input Value(s)";
   return 0;
 }
           
 Flooring flr(length, width, type);
 //ofstream outfile("output.txt");
 cout << "$" << flr.price();
 //outfile.close();
 return 0;
}