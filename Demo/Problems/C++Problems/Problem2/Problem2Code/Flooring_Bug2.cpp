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
 double length;
 double width;
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
   return len * wid;
 }
  
double price()
 {
   double area = computeArea(width, width);
   double price = 2*area;
   if(type == SHAG)
      price *= shagCarpet;
   else if(type == LINO)
      price *= linoleum;
   else if (type == WOOD)
      price *= hardwood;
   return price;
 }
};

int main(int argc, char* argv[]) {
 double length = 0;
 double width = 0;
 int type = 0;
      
 length = atoi(argv[1]);
 width = atoi(argv[2]);
 type = atoi(argv[3]);

 if(length <= 0 || width <= 0 ||type <= 0 || 
      type > 3)
 {
   cout << "Invalid Input Value(s)";
   return 0;
 }
           
 Flooring flr(length, width, type);
 //ofstream outfile("output.txt");
 cout << "$" << setprecision(3) << flr.price();
 //outfile.close();
 return 0;
}