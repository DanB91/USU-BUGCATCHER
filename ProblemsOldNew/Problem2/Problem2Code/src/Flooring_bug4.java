/*
 * BUG 4 : LINE 38 if statement should be else if(type == LINO).

 */

/**
 *
 * @author DPDR
 */
 
public class Flooring_bug4 {
    private double length = 0;
    private double width = 0;
    private int type = 0;
    private static double shagCarpet = 1.00;
    private static double linoleum = 2.50;
    private static double hardwood = 5.00;
	public static final int SHAG = 1;
	public static final int LINO = 2;
	public static final int WOOD = 3;
    
    
    public Flooring_bug4(double len, double wid, int typ)
    {
        length = len;
        width = wid;
        type = typ;
    }
    
    private double computeArea(double len, double wid)
    {
        return len * wid;
    }
    
    public double price()
    {
        double area = computeArea(length, width);
        double price = area;
        if(type == SHAG)
            price *= shagCarpet;
        else if(type == WOOD)
            price *= linoleum;
        else
            price *= hardwood;
            
        return price;
    }
}