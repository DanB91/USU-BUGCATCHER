/**
 *
 * @author DPDR
 */

public class Flooring_Oracle {

    private double length = 0;
    private double width = 0;
    private int type = 0;
    private static double shagCarpet = 1.00;
    private static double linoleum = 2.50;
    private static double hardwood = 5.00;
	public static final int SHAG = 1;
	public static final int LINO = 2;
	public static final int WOOD = 3;
    
    
    public Flooring_Oracle(double len, double wid, int typ)
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
        else if(type == LINO)
            price *= linoleum; 
        else
            price *= hardwood;     
        return price;
    }
    
    public static void main(String[] args) 
    {        
        //retrieve arguments from command line
        double length = Double.parseDouble(args[0]);    
        double width = Double.parseDouble(args[1]); 
        int type = Integer.parseInt(args[2]);          
        
        //print the output
        Flooring_Oracle oracle = new Flooring_Oracle(length, width, type); 
        System.out.printf("$"+"%1$.2f\n", oracle.price());
    }
}
