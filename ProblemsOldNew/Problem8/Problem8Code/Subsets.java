package namedent;

import java.util.ArrayList;
import java.util.List;

public class Subsets {
	
	public static boolean subsetSum(int sum, List<Integer> set){
		if (set.isEmpty()){
			return (sum==0);
		}
		else {
			int first = set.remove(0);
			return ((subsetSum(sum, set))||(subsetSum(sum-first, set)));
		}
	}
	
	public static void main(String[] args){
		try{
			List<Integer> inputSet = new ArrayList<Integer>();
			for (int i = 1; i<args.length; i++){
				inputSet.add(Integer.parseInt(args[i]));
			}
			System.out.println(subsetSum(Integer.parseInt(args[0]), inputSet));
		} catch(NumberFormatException e){
			System.out.println("Subsets takes only integers");
		} catch(ArrayIndexOutOfBoundsException e2){
			System.out.println("Subsets takes at least one argument");
		}
	}
}
