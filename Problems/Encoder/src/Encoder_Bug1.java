//BUG 1: LINE 32 adds 26 when the shifted letter is a, shifting it past z.

public class Encoder_Bug1 {	
	public static String encrypt(String toEncrypt, double shift){
		char[] letterArray = toEncrypt.toCharArray();
		char[] encryptedLetterArray = new char[letterArray.length];
		
		for (int i = 0; i < letterArray.length; i++)
		{
			encryptedLetterArray[i] = encryptChar(letterArray[i], shift);
		}
		
		return new String(encryptedLetterArray);
	}
	
	public static char encryptChar(char letter, double shift){
		if (Character.isLowerCase(letter))
		{
			double shiftedLetter = (letter - 'a') + shift;
			if (shiftedLetter < 0) 
				shiftedLetter += 26;
			else 
				shiftedLetter %= 26;
			
			return (char) (shiftedLetter + 'a');
		}
		else 
		{
			double shiftedLetter = (letter - 'A') + shift;
			if (shiftedLetter <= 0)
				shiftedLetter += 26;
			else
				shiftedLetter %= 26;
			
			return (char) (shiftedLetter + 'A');
		}
	}
	
    public static void main(String[] args){
        String toEncrypt = args[0];
        try{
            int shift = Integer.parseInt(args[1]);
            String encrypted = encrypt(toEncrypt, shift);
            System.out.println(encrypted);
        }catch(Exception e){
            System.out.println("Error: Bad Input");
        }
    }
}
