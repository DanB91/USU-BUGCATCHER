/*
 * BUG 2 : LINE 34 computerArea() should receive length and width not width, width

 */

/**
 *
 * @author DPDR
 */
 
public class Flooring_bug2 {
    private double length = 0;
    private double width = 0;
    private int type = 0;
    private static double shagCarpet = 1.00;
    private static double linoleum = 2.50;
    private static double hardwood = 5.00;
	public static final int SHAG = 1;
	public static final int LINO = 2;
	public static final int WOOD = 3;
    
    
    public Flooring_bug2(double len, double wid, int typ)
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
        double area = computeArea(width, width);
        double price = area;
        if(type == SHAG)
            price *= shagCarpet;
        else if(type == LINO)
            price *= linoleum;
        else
            price *= hardwood;
            
        return price;
    }
}
