
export const SYNTAX_QUESTIONS = [
  {
    id: 1,
    code: 'int number = "10";',
    isCorrect: false,
    explanation: 'You cannot assign a String ("10") to an int variable. It should be: int number = 10;'
  },
  {
    id: 2,
    code: 'System.out.println("Hello");',
    isCorrect: true,
    explanation: 'This is correct Java syntax for printing to the console.'
  },
  {
    id: 3,
    code: 'boolean isJavaFun = true',
    isCorrect: false,
    explanation: 'Missing semicolon at the end of the statement.'
  },
  {
    id: 4,
    code: 'String char = \'A\';',
    isCorrect: false,
    explanation: 'Strings must use double quotes ("A"). Single quotes are for char types.'
  },
  {
    id: 5,
    code: 'if (x == 5) { System.out.println("Five"); }',
    isCorrect: true,
    explanation: 'Correct use of if-statement and equality operator (==).'
  },
  {
    id: 6,
    code: 'for (int i = 0; i < 5; i++) { }',
    isCorrect: true,
    explanation: 'Standard for-loop syntax.'
  },
  {
    id: 7,
    code: 'double price = 19.99;',
    isCorrect: true,
    explanation: 'Correct declaration of a double variable.'
  },
  {
    id: 8,
    code: 'int[] numbers = {1, 2, 3};',
    isCorrect: true,
    explanation: 'Correct array initialization.'
  },
  {
    id: 9,
    code: 'class MyClass { void myMethod() }',
    isCorrect: false,
    explanation: 'Missing braces {} for the method body.'
  },
  {
    id: 10,
    code: 'float pi = 3.14;',
    isCorrect: false,
    explanation: 'Float literals need an "f" suffix: float pi = 3.14f;'
  }
];

export const SCRAMBLE_WORDS = [
  { word: 'VARIABLE', hint: 'A container for storing data values.' },
  { word: 'INTEGER', hint: 'A data type for whole numbers.' },
  { word: 'STRING', hint: 'A sequence of characters.' },
  { word: 'BOOLEAN', hint: 'A data type with only two possible values: true or false.' },
  { word: 'METHOD', hint: 'A block of code which only runs when it is called.' },
  { word: 'CLASS', hint: 'A blueprint for creating objects.' },
  { word: 'OBJECT', hint: 'An instance of a class.' },
  { word: 'LOOP', hint: 'Used to execute a block of code repeatedly.' },
  { word: 'ARRAY', hint: 'Used to store multiple values in a single variable.' },
  { word: 'SCANNER', hint: 'A class used to get user input.' }
];

export const OUTPUT_QUESTIONS = [
  {
    id: 1,
    code: `int a = 5;
int b = 3;
System.out.println(a + b);`,
    output: '8',
    explanation: '5 + 3 equals 8.'
  },
  {
    id: 2,
    code: `String x = "10";
String y = "20";
System.out.println(x + y);`,
    output: '1020',
    explanation: 'When using + with Strings, it concatenates them, not adds them mathematically.'
  },
  {
    id: 3,
    code: `int i = 0;
while (i < 3) {
  System.out.print(i);
  i++;
}`,
    output: '012',
    explanation: 'The loop prints 0, then 1, then 2. It stops when i becomes 3.'
  },
  {
    id: 4,
    code: `String name = "Java";
System.out.println(name.length());`,
    output: '4',
    explanation: '"Java" has 4 characters.'
  },
  {
    id: 5,
    code: `boolean a = true;
boolean b = false;
System.out.println(a && b);`,
    output: 'false',
    explanation: 'The AND operator (&&) returns true only if both sides are true.'
  }
];

export const BUG_FIX_LEVELS = [
  {
    id: 1,
    title: "The Missing Piece",
    description: "The compiler is complaining! This simple print statement won't run. Fix the syntax error.",
    initialCode: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello Java")
  }
}`,
    expectedOutput: "Hello Java",
    hint: "Every statement in Java must end with a semicolon (;)."
  },
  {
    id: 2,
    title: "Type Trouble",
    description: "We are trying to store a decimal number in an integer variable, which causes a loss of precision error. Change the data type to something that holds decimals.",
    initialCode: `public class Main {
  public static void main(String[] args) {
    int pi = 3.14159;
    System.out.println(pi);
  }
}`,
    expectedOutput: "3.14159",
    hint: "The 'int' type is for whole numbers. Use 'double' for decimals."
  },
  {
    id: 3,
    title: "Logic Loop-hole",
    description: "This loop should print numbers 1 through 5 inclusive. However, it currently stops at 4. Adjust the loop condition.",
    initialCode: `public class Main {
  public static void main(String[] args) {
    for (int i = 1; i < 5; i++) {
      System.out.println(i);
    }
  }
}`,
    expectedOutput: "1\n2\n3\n4\n5",
    hint: "The condition 'i < 5' stops when i is 5. Change it to 'i <= 5'."
  },
  {
    id: 4,
    title: "Case Sensitivity",
    description: "Java is case-sensitive. The code below has a few capitalization errors that prevent it from running. Fix them.",
    initialCode: `public class Main {
  public static void main(string[] args) {
    system.out.println("I love Java");
  }
}`,
    expectedOutput: "I love Java",
    hint: "String and System are classes, so they must start with a capital letter."
  }
];

export const TRIVIA_QUESTIONS = [
    {
        id: 1,
        question: "Which keyword is used to create a class in Java?",
        options: ["className", "class", "define", "struct"],
        correctAnswer: "class",
        explanation: "The 'class' keyword is used to define a new class blueprint."
    },
    {
        id: 2,
        question: "What is the correct way to create a comment in Java?",
        options: ["# This is a comment", "<!-- Comment -->", "// This is a comment", "** Comment **"],
        correctAnswer: "// This is a comment",
        explanation: "// is used for single-line comments, and /* */ for multi-line comments."
    },
    {
        id: 3,
        question: "Which data type is used to store a single character?",
        options: ["String", "char", "Character", "text"],
        correctAnswer: "char",
        explanation: "The 'char' primitive type stores a single 16-bit Unicode character, e.g., 'A'."
    },
    {
        id: 4,
        question: "Which method is the entry point of any Java program?",
        options: ["start()", "run()", "main()", "init()"],
        correctAnswer: "main()",
        explanation: "The public static void main(String[] args) method is where execution begins."
    },
    {
        id: 5,
        question: "What is the default value of a boolean variable?",
        options: ["true", "false", "null", "0"],
        correctAnswer: "false",
        explanation: "The default value for a boolean field is false."
    }
];