//Bug 3: LINE 24 doesn't return -ay after a single letter word

public class PigLatin_Bug3 {
	
	public static String translate(String[] words){
		String toReturn = "";
		for (String word : words){
			String plWord = translateWord(word.toLowerCase());
			toReturn += plWord + " ";
		}
		return toReturn;
	}
	
	public static String translateWord(String word){
		if (word.length() > 1){
			char firstLetter = word.charAt(0);
			char secondLetter = word.charAt(1);
			
			if (firstLetter=='a'||firstLetter=='e'||firstLetter=='i'||firstLetter=='o'||firstLetter=='u'){
				return word + "-ay";
			} else if ((firstLetter=='c'&&secondLetter=='h')||(firstLetter=='s'&&secondLetter=='h')||(firstLetter=='t'&&secondLetter=='h')){
				return word.substring(2) + firstLetter + secondLetter + "-ay";
			} else return word.substring(1) + firstLetter + "-ay";
		} else return word;
	}
	
	public static void main(String[] args){
		String translated = translate(args);
		System.out.println(translated);
	}
}
