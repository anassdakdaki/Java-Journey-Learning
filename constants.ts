import { Section } from './types';

export const COURSE_CONTENT: Section[] = [
  {
    id: 'sec0',
    title: 'Programming Fundamentals & How Java Works',
    lessons: [
      {
        id: 'l0',
        title: 'What is Programming?',
        steps: [
          {
            id: 'l0-cs1',
            type: 'context',
            title: 'The "Why" of Programming',
            content: "Think of programming as learning a new language to communicate with computers. This skill isn't just for building websites; it's about problem-solving. Learning to code teaches you to break down complex problems into small, manageable steps—a valuable skill in any career."
          },
          {
            id: 'l0s1',
            type: 'concept',
            title: 'Giving Instructions to Computers',
            content: "At its core, programming is about giving instructions to a computer to perform a specific task. We write these instructions in a 'programming language', like Java, which is designed to be understandable by humans. The computer then translates these instructions into a language it can understand (binary) to execute them.",
          },
          {
            id: 'l0s2',
            type: 'concept',
            title: 'Algorithms: The Recipe for Code',
            content: "Before you write code, you need a plan. This plan is called an algorithm. It's a step-by-step procedure for solving a problem or achieving a goal. For example, an algorithm for making tea would be: 1. Boil water. 2. Put tea bag in cup. 3. Pour water into cup. 4. Wait 3 minutes. Good programming starts with good algorithms.",
          },
        ]
      },
      {
        id: 'l0-2',
        title: 'How Java Works',
        steps: [
          {
            id: 'l0-2s1',
            type: 'concept',
            title: 'The Java Virtual Machine (JVM)',
            content: "Java is famous for its 'write once, run anywhere' philosophy. This is possible because of the Java Virtual Machine (JVM). When you write Java code, it's compiled into a special format called 'bytecode', not machine code. The JVM is a program that reads this bytecode and translates it into the native machine code for whatever device it's running on—Windows, Mac, Linux, or Android.",
            codeExample: `Your Java Code -> Java Compiler -> Bytecode -> JVM -> Runs on any device!`,
            visual: 'jvm',
          },
          {
            id: 'l0-2s2',
            type: 'concept',
            title: 'Anatomy of a Java Program',
            content: "Every Java program has a few key parts. The `class` is a container for your program. The `main` method is the entry point—it's the first thing that runs when your program starts. `System.out.println()` is a command to print text to the console.",
            codeExample: `public class MyFirstProgram { // The class container
  public static void main(String[] args) { // The main method entry point
    System.out.println("This is a statement."); // A command to execute
  }
}`
          },
          {
            id: 'l0-2s3',
            type: 'exercise',
            title: 'Identify the Entry Point',
            question: "In a standard Java application, what is the name of the method that serves as the entry point for the program?",
            codeTemplate: `public class Main {\n  public static void ___ (String[] args) {\n    System.out.println("Program starts here!");\n  }\n}`,
            correctAnswer: 'main',
            hint: 'It is the primary, or `main`, method of the program.'
          }
        ]
      },
      {
        id: 'l0-3',
        title: 'Section 0 Review',
        steps: [
          {
            id: 'l0-3s1',
            type: 'exercise',
            title: 'Review: The Main Method',
            question: "A Java program always starts execution in the `main` method. Fill in the blank to complete its declaration.",
            codeTemplate: `public class App {\n  public static void main(___[] args) {\n    System.out.println("This runs first!");\n  }\n}`,
            correctAnswer: 'String',
            hint: 'The main method accepts an array of text arguments, and the type for text is `String`.'
          },
          {
            id: 'l0-3s2',
            type: 'practice',
            title: 'Review: Write a Program Outline',
            problem: 'Write the basic structure of a Java program. Create a class named `ReviewApp` and inside it, create a `main` method that prints "Reviewing the basics." to the console.',
            initialCode: `// Create your class and main method here`
          }
        ]
      }
    ]
  },
  {
    id: 'sec1',
    title: 'Java Basics',
    lessons: [
      {
        id: 'l1',
        title: 'First Steps & Basic Output',
        steps: [
          {
            id: 'l1-cs1',
            type: 'context',
            title: 'Real-World Connection: Data Everywhere',
            content: "Every app, website, or game you use is built on simple foundations. Variables store your username or high score, and operators calculate the total price in a shopping cart. Understanding these basics is like learning the alphabet before you can write a story—they are the essential building blocks for everything that follows."
          },
          {
            id: 'l1s1',
            type: 'concept',
            title: 'Welcome to Java!',
            content: "Let's start with the classic 'Hello, World!' program. This is the traditional first step for any programmer. The `System.out.println()` command prints a line of text to the console.",
            codeExample: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}`,
          },
          {
            id: 'l1s2',
            type: 'exercise',
            title: 'Your First Output',
            question: "Modify the code to print 'Java is fun!' to the console. Remember, the text to be printed goes inside the double quotes.",
            codeTemplate: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("___");\n  }\n}`,
            correctAnswer: 'Java is fun!',
            hint: "Make sure the text inside the parentheses matches 'Java is fun!' exactly, including the quotes."
          },
          {
            id: 'l1s3',
            type: 'practice',
            title: 'Practice Printing',
            problem: 'Write a Java program that prints your name to the console on one line, and your favorite hobby on a second line. Use two `System.out.println()` statements.',
            initialCode: `public class MyInfo {\n  public static void main(String[] args) {\n    // Your code here\n  }\n}`,
          },
        ],
      },
      {
        id: 'l2',
        title: 'Variables and Primitive Data Types',
        steps: [
          {
            id: 'l2s1',
            type: 'concept',
            title: 'What are Variables?',
            content: "A variable is a container that holds a value. In Java, you must declare the 'data type' of the variable. This tells Java what kind of data to expect. Primitive types are the most basic data types available.",
            codeExample: `// Declaring variables\nint age = 25; // Integer\ndouble price = 19.99; // Floating-point number\nboolean isLoggedIn = true; // True or false\nchar initial = 'J'; // Single character`,
          },
          {
             id: 'l2s2',
            type: 'concept',
            title: 'The String Type',
            content: "While not a primitive type, the `String` is one of the most commonly used types in Java. It represents a sequence of characters (text). Notice that `String` starts with a capital 'S'.",
            codeExample: `String name = "Alex";\nString greeting = "Hello, world!";\n\nSystem.out.println(name + " says: " + greeting);`,
          },
          {
            id: 'l2s3',
            type: 'exercise',
            title: 'Declare a Double',
            question: "Declare a `double` variable named `pi` and assign it the value `3.14`. Then print it.",
            codeTemplate: `public class Main {\n  public static void main(String[] args) {\n    ___ pi = 3.14;\n    System.out.println(pi);\n  }\n}`,
            correctAnswer: 'double',
            hint: 'The keyword for declaring a floating-point (decimal) number is `double`.'
          },
          {
            id: 'l2s4',
            type: 'practice',
            title: 'User Profile',
            problem: 'Create a simple user profile. Declare variables for a name (`String`), age (`int`), and if they are a student (`boolean`). Assign them values and print them out in a readable format.',
            initialCode: `public class UserProfile {\n  public static void main(String[] args) {\n    // Declare name, age, and student status\n\n    // Print the profile\n  }\n}`,
          },
        ],
      },
      {
        id: 'l3',
        title: 'Basic Operators',
        steps: [
          {
            id: 'l3s1',
            type: 'concept',
            title: 'Arithmetic & Assignment',
            content: "Java includes standard arithmetic operators: `+`, `-`, `*`, `/`, and `%` (modulus/remainder). The assignment operator `=` is used to assign a value to a variable.",
            codeExample: `int x = 10;\nx = x + 5; // x is now 15\n\nint y = x * 2; // y is 30\nint remainder = 10 % 3; // remainder is 1`,
          },
          {
            id: 'l3s2',
            type: 'exercise',
            title: 'Calculate the Total',
            question: "You bought 3 items costing 15 each. Calculate and print the total cost. Fill in the blank with the correct operator.",
            codeTemplate: `public class Main {\n  public static void main(String[] args) {\n    int items = 3;\n    int costPerItem = 15;\n    int total = items ___ costPerItem;\n    System.out.println(total);\n  }\n}`,
            correctAnswer: '*',
            hint: 'The operator for multiplication in Java is the asterisk symbol `*`.'
          },
           {
            id: 'l3s3',
            type: 'practice',
            title: 'Area of a Rectangle',
            problem: 'Write a program to calculate the area of a rectangle. Create two integer variables, `length` and `width`, assign them values, and then calculate and print the area (length * width).',
            initialCode: `public class RectangleArea {\n  public static void main(String[] args) {\n    int length = 8;\n    int width = 5;\n    // Calculate and print the area\n  }\n}`,
          },
        ]
      },
      {
        id: 'l4',
        title: 'Section 1 Review',
        steps: [
            {
                id: 'l4s1',
                type: 'exercise',
                title: 'Review: Printing Variables',
                question: "Declare a `String` variable `greeting` with the value 'Hello, Java Learner!' and print it to the console.",
                codeTemplate: `public class Main {\n  public static void main(String[] args) {\n    ___ greeting = "Hello, Java Learner!";\n    System.out.println(greeting);\n  }\n}`,
                correctAnswer: 'String',
                hint: 'The data type for text in Java is `String`, with a capital S.'
            },
            {
                id: 'l4s2',
                type: 'practice',
                title: 'Review: Simple Calculator',
                problem: 'Create a program that acts as a simple calculator. Declare two `double` variables, `num1` and `num2`. Then, print their sum, difference, product, and quotient.',
                initialCode: `public class SimpleCalc {\n  public static void main(String[] args) {\n    double num1 = 20.5;\n    double num2 = 4.5;\n    // Print sum, difference, product, and quotient\n  }\n}`,
            }
        ]
      }
    ],
  },
  {
    id: 'sec2',
    title: 'Control Flow',
    lessons: [
       {
        id: 'l8',
        title: 'Getting User Input',
        steps: [
          {
            id: 'l8-cs1',
            type: 'context',
            title: 'Real-World Connection: Making Apps Interactive',
            content: "How does an app respond to you? Control Flow is the answer. When you log in, the app uses an 'if' statement to check your password. When you scroll through a social media feed, it uses a 'loop' to show post after post. This section teaches you how to make your programs smart and responsive."
          },
          {
            id: 'l8s1',
            type: 'concept',
            title: 'Interactive Programs with `Scanner`',
            content: "To make your programs interactive, you need input from the user. In Java, a common way to do this is with the `Scanner` class. You must first `import` it from Java's utility library.",
            codeExample: `import java.util.Scanner; // Import the Scanner class\n\npublic class Main {\n  public static void main(String[] args) {\n    Scanner myScanner = new Scanner(System.in); // Create a Scanner object\n    System.out.println("Enter your name:");\n\n    String name = myScanner.nextLine(); // Read user input\n    System.out.println("Hello, " + name + "!");\n  }\n}`,
          },
          {
            id: 'l8s2',
            type: 'exercise',
            title: 'Read a Number',
            question: "The method to read a whole number (an integer) is `nextInt()`. Fill in the blank to read the user's age.",
            codeTemplate: `import java.util.Scanner;\n\npublic class Main {\n  public static void main(String[] args) {\n    Scanner scanner = new Scanner(System.in);\n    System.out.println("Enter your age:");\n    int age = scanner.___();\n    System.out.println("You are " + age + " years old.");\n  }\n}`,
            correctAnswer: 'nextInt',
            hint: "To read a String line, you use `nextLine()`. To read an integer, you use `nextInt()`."
          },
          {
            id: 'l8s3',
            type: 'practice',
            title: 'Simple Adder',
            problem: 'Write a program that asks the user for two integers, calculates their sum, and prints the result. You will need to use the `nextInt()` method twice.',
            initialCode: `import java.util.Scanner;\n\npublic class Adder {\n  public static void main(String[] args) {\n    Scanner input = new Scanner(System.in);\n    // Ask for the first number\n\n    // Ask for the second number\n\n    // Calculate and print the sum\n  }\n}`,
          },
        ],
      },
      {
        id: 'l5',
        title: 'Conditional Statements',
        steps: [
          {
            id: 'l5s1',
            type: 'concept',
            title: 'Making Decisions with `if-else`',
            content: "Programs need to make decisions. The `if` statement executes code only if a condition is true. `else` provides an alternative for when it's false. Conditions often use comparison operators like `>` (greater than), `<` (less than), `==` (equal to), and `!=` (not equal to).",
            codeExample: `int grade = 85;\n\nif (grade >= 60) {\n  System.out.println("You passed!");\n} else {\n  System.out.println("You need to study more.");\n}`,
          },
           {
            id: 'l9s1',
            type: 'concept',
            title: '`else if` and `switch`',
            content: "For more than two possibilities, you can use `else if` to check multiple conditions. For checking one variable against many specific values, the `switch` statement is often cleaner.",
            codeExample: `// Using else if\nint score = 75;\nif (score >= 90) {\n  System.out.println("A");\n} else if (score >= 80) {\n  System.out.println("B");\n} else {\n  System.out.println("C or lower");\n}\n\n// Using switch\nint day = 3;\nswitch (day) {\n  case 1: System.out.println("Monday"); break;\n  case 2: System.out.println("Tuesday"); break;\n  default: System.out.println("Some other day");\n}`,
          },
          {
            id: 'l5s2',
            type: 'exercise',
            title: 'Check Equality',
            question: "Fill in the blank to check if `myNumber` is equal to 10.",
            codeTemplate: `public class Main {\n  public static void main(String[] args) {\n    int myNumber = 10;\n    if (myNumber ___ 10) {\n      System.out.println("It's ten!");\n    }\n  }\n}`,
            correctAnswer: '==',
            hint: "The operator for checking equality is `==`. A single `=` is for assignment."
          },
          {
            id: 'l5s3',
            type: 'practice',
            title: 'Even or Odd',
            problem: 'Write a program that checks if a number is even or odd. Use the modulus operator (`%`). If a number divided by 2 has a remainder of 0, it is even. Otherwise, it is odd.',
            initialCode: `public class EvenOrOdd {\n  public static void main(String[] args) {\n    int number = 7;\n    // Write your if-else statement here\n  }\n}`,
          },
        ]
      },
      {
        id: 'l6',
        title: 'Loops for Repetition',
        steps: [
            {
                id: 'l6s1',
                type: 'concept',
                title: 'Repeating with `for` Loops',
                content: "Loops execute code repeatedly. The `for` loop is great when you know how many times you want to loop. It has three parts: initialization, condition, and increment.",
                codeExample: `// This loop prints numbers from 1 to 5\nfor (int i = 1; i <= 5; i++) {\n  System.out.println("Count is: " + i);\n}`,
            },
             {
                id: 'l10s1',
                type: 'concept',
                title: 'The `while` and `do-while` Loops',
                content: "A `while` loop continues as long as its condition is true. It's great when you don't know the number of iterations beforehand. A `do-while` loop is similar, but it guarantees the code block runs at least once because the condition is checked *after* the block.",
                codeExample: `int count = 1;\nwhile (count <= 3) {\n  System.out.println("While loop: " + count);\n  count++;\n}\n\nint secretCode = 0;\ndo {\n  System.out.println("Guessing the code...");\n  secretCode++;\n} while (secretCode != 5); // Runs 5 times`,
            },
            {
                id: 'l6s2',
                type: 'exercise',
                title: 'Count to Three',
                question: "Fix the loop's condition so that it prints numbers from 1 to 3.",
                codeTemplate: `public class Main {\n  public static void main(String[] args) {\n    for (int i = 1; i ___ 3; i++) {\n      System.out.println(i);\n    }\n  }\n}`,
                correctAnswer: '<=',
                hint: 'To include the number 3 in the loop, the condition should be "less than or equal to".'
            },
            {
                id: 'l6s3',
                type: 'practice',
                title: 'Times Table',
                problem: 'Write a program that prints the 5 times table (from 5x1 to 5x10). Use a `for` loop that runs 10 times.',
                initialCode: `public class TimesTable {\n  public static void main(String[] args) {\n    int num = 5;\n    System.out.println("5 Times Table:");\n    // Your for loop here\n  }\n}`,
            }
        ]
      },
       {
        id: 'l6-2',
        title: 'Loop Control with break and continue',
        steps: [
          {
            id: 'l6-2s1',
            type: 'concept',
            title: 'Controlling Your Loops',
            content: "Sometimes you need more control inside a loop. The `break` statement immediately exits the current loop, regardless of the loop's condition. The `continue` statement skips the rest of the current iteration and jumps to the next one.",
            codeExample: `// Using break to find a value
for (int i = 1; i <= 10; i++) {
  if (i == 5) {
    break; // Stops the loop when i is 5
  }
  System.out.println(i); // Prints 1, 2, 3, 4
}

// Using continue to skip odd numbers
for (int i = 1; i <= 10; i++) {
  if (i % 2 != 0) {
    continue; // Skips the println for odd numbers
  }
  System.out.println(i); // Prints 2, 4, 6, 8, 10
}`
          },
          {
            id: 'l6-2s2',
            type: 'practice',
            title: 'Find the First Multiple of 7',
            problem: 'Write a program that loops through numbers from 1 to 100. Find the first number that is a multiple of 7 and print it. Once you find it, use the `break` statement to exit the loop.',
            initialCode: `public class FindMultiple {\n  public static void main(String[] args) {\n    // Your for loop here\n  }\n}`
          }
        ]
      },
      {
        id: 'l7',
        title: 'Section 2 Review',
        steps: [
            {
                id: 'l7s1',
                type: 'exercise',
                title: 'Review: `while` loop',
                question: "Complete the `while` loop to print numbers from 1 up to (and including) 5.",
                codeTemplate: `public class Main {\n  public static void main(String[] args) {\n    int i = 1;\n    while (i ___ 5) {\n      System.out.println(i);\n      i++;\n    }\n  }\n}`,
                correctAnswer: '<=',
                hint: 'To include 5, the condition must be "less than or equal to".'
            },
            {
                id: 'l7s2',
                type: 'practice',
                title: 'Review: Guessing Game',
                problem: 'Write a simple guessing game. Ask the user to guess a number between 1 and 10. Use a `while` loop to keep asking until they guess the secret number (e.g., 7). Tell them if they got it right.',
                initialCode: `import java.util.Scanner;\n\npublic class GuessingGame {\n  public static void main(String[] args) {\n    Scanner scanner = new Scanner(System.in);\n    int secretNumber = 7;\n    int userGuess = 0;\n\n    System.out.println("Guess the number (1-10):");\n    // Your while loop here\n\n    System.out.println("You got it right!");\n  }\n}`,
            }
        ]
      }
    ]
  },
  {
    id: 'sec4',
    title: 'Object-Oriented Programming (Part 1)',
    lessons: [
      {
        id: 'l13',
        title: 'Classes and Objects',
        steps: [
          {
            id: 'l13-cs1',
            type: 'context',
            title: 'Real-World Connection: Modeling the World',
            content: "Object-Oriented Programming (OOP) is a powerful way to manage complexity in large applications. Think about a social media app: you have Users, Posts, and Comments. In OOP, each of these would be an 'object', with its own data (like a username) and behaviors (like posting a comment). This approach makes code more organized, reusable, and easier to understand."
          },
          {
            id: 'l13s1',
            type: 'concept',
            title: 'Blueprints and Instances',
            content: "Object-Oriented Programming (OOP) is a way of thinking about programming using real-world concepts. A `class` is like a blueprint (e.g., the blueprint for a 'Car'). An `object` is an actual instance created from that blueprint (e.g., your specific blue Toyota).",
            codeExample: `// The blueprint for a Dog\nclass Dog {\n  String breed;\n  int age;\n  String color;\n}\n\n// Creating actual Dog objects (instances)\nDog myDog = new Dog();\nmyDog.breed = "Golden Retriever";\nmyDog.age = 5;`,
            visual: 'classVsObject',
          },
          {
            id: 'l13s2',
            type: 'exercise',
            title: 'Create an Object',
            question: "Fill in the blank to create a new `Car` object from the `Car` class.",
            codeTemplate: `class Car {}\n\npublic class Main {\n  public static void main(String[] args) {\n    Car myCar = ___ Car();\n  }\n}`,
            correctAnswer: 'new',
            hint: 'The `new` keyword is used to create a new object instance from a class.'
          },
          {
            id: 'l13s3',
            type: 'practice',
            title: 'Create a Book Class',
            problem: 'Create a class named `Book` with two properties: a `String` named `title` and an `int` named `pageCount`. In your `main` method, create a `Book` object, set its title and page count, and then print them.',
            initialCode: `// Define the Book class here\n\n\npublic class Library {\n  public static void main(String[] args) {\n    // Create a Book object and set its properties\n\n    // Print the book's details\n  }\n}`,
          },
        ],
      },
      {
        id: 'l14',
        title: 'Methods',
        steps: [
          {
            id: 'l14s1',
            type: 'concept',
            title: 'Adding Behavior',
            content: "Methods are functions defined inside a class that define the behavior of the objects. They are the actions an object can perform. For example, a `Dog` object might have a `bark()` method.",
            codeExample: `class Dog {\n  String name;\n\n  // This is a method\n  void bark() {\n    System.out.println(name + " says: Woof!");\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Dog myDog = new Dog();\n    myDog.name = "Buddy";\n    myDog.bark(); // Calls the bark method\n  }\n}`,
          },
          {
            id: 'l14s2',
            type: 'exercise',
            title: 'Call a Method',
            question: "We have a `Greeter` class with a `sayHello` method. Fill in the blank to call this method on the `greeter` object.",
            codeTemplate: `class Greeter {\n  void sayHello() {\n    System.out.println("Hello there!");\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Greeter greeter = new Greeter();\n    greeter.___();\n  }\n}`,
            correctAnswer: 'sayHello',
            hint: 'To call a method on an object, you use the object name, a dot, and the method name followed by parentheses.'
          },
          {
            id: 'l14s3',
            type: 'practice',
            title: 'Calculator Class',
            problem: 'Create a `Calculator` class with a method called `add` that takes two integer parameters (`int a`, `int b`) and returns their sum. In `main`, create a `Calculator` object, call the `add` method with two numbers, and print the result.',
            initialCode: `// Define the Calculator class with an add method\n\n\npublic class Main {\n  public static void main(String[] args) {\n    // Create a Calculator object\n\n    // Call the add method and print the result\n  }\n}`,
          },
        ],
      },
      {
        id: 'l15',
        title: 'Constructors',
        steps: [
          {
            id: 'l15s1',
            type: 'concept',
            title: 'Initializing Objects',
            content: "A constructor is a special method that is called when an object is created. It's used to set initial values for object properties. A constructor has the same name as the class and does not have a return type.",
            codeExample: `class Car {\n  String model;\n\n  // This is the constructor\n  public Car(String modelName) {\n    model = modelName;\n    System.out.println("A new car was created: " + model);\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    // The constructor is called here\n    Car myCar = new Car("Mustang");\n  }\n}`,
          },
          {
            id: 'l15s2',
            type: 'exercise',
            title: 'Define a Constructor',
            question: "Fill in the blank to define a constructor for the `Person` class.",
            codeTemplate: `class Person {\n  String name;\n\n  public ___ (String newName) {\n    name = newName;\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Person p = new Person("John");\n    System.out.println(p.name);\n  }\n}`,
            correctAnswer: 'Person',
            hint: 'A constructor always has the same name as the class.'
          },
          {
            id: 'l15s3',
            type: 'practice',
            title: 'Student Constructor',
            problem: 'Create a `Student` class with two properties: `name` (String) and `grade` (int). Create a constructor that takes a name and a grade as parameters and initializes the properties. In `main`, create two different `Student` objects using your constructor.',
            initialCode: `// Define the Student class here\n\n\npublic class Main {\n  public static void main(String[] args) {\n    // Create two student objects\n  }\n}`,
          },
        ]
      },
      {
        id: 'l15-2',
        title: 'Section 4 Review',
        steps: [
            {
                id: 'l15-2s1',
                type: 'exercise',
                title: 'Review: Creating an Object',
                question: "Use the `new` keyword to create an instance of the `Dog` class.",
                codeTemplate: `class Dog {}\n\npublic class Main {\n  public static void main(String[] args) {\n    Dog myDog = ___ Dog();\n  }\n}`,
                correctAnswer: 'new',
                hint: 'The `new` keyword is used to instantiate an object.'
            },
            {
                id: 'l15-2s2',
                type: 'practice',
                title: 'Review: Person Class',
                problem: 'Create a `Person` class with a `name` (String) property and an `introduce()` method that prints "Hello, my name is [name]". Create a constructor to set the name. In `main`, create a `Person` object and call the `introduce()` method.',
                initialCode: `// Define the Person class here\n\n\npublic class Main {\n  public static void main(String[] args) {\n    // Create a Person and call introduce()\n  }\n}`
            }
        ]
      }
    ]
  },
   {
    id: 'sec5',
    title: 'Object-Oriented Programming (Part 2)',
    lessons: [
      {
        id: 'l16',
        title: 'Encapsulation',
        steps: [
          {
            id: 'l16s1',
            type: 'concept',
            title: 'Protecting Your Data',
            content: "Encapsulation means bundling the data (properties) and methods that work on that data within one unit (a class). It also involves restricting direct access to some of an object's components, which is known as data hiding. We use the `private` keyword to hide data and provide public 'getter' and 'setter' methods to access and modify it.",
            codeExample: `class BankAccount {\n  private double balance; // private: can only be accessed within this class\n\n  public double getBalance() { // getter: public way to read the balance\n    return balance;\n  }\n\n  public void deposit(double amount) { // setter: public way to change the balance\n    if (amount > 0) {\n      balance += amount;\n    }\n  }\n}`,
          },
          {
            id: 'l16s2',
            type: 'exercise',
            title: 'Get the Name',
            question: "The `name` property is private. Fill in the blank to correctly call the public getter method to retrieve the name.",
            codeTemplate: `class Person {\n  private String name = "Maria";\n\n  public String getName() {\n    return name;\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Person p = new Person();\n    System.out.println(p.___());\n  }\n}`,
            correctAnswer: 'getName',
            hint: 'By convention, a method that retrieves a property named `x` is called `getX()`.'
          },
          {
            id: 'l16s3',
            type: 'practice',
            title: 'Encapsulate a Student',
            problem: 'Modify the `Student` class from before. Make the `name` and `grade` properties `private`. Create a public getter for the name and a public getter and setter for the grade. The setter for the grade should only allow values between 0 and 100.',
            initialCode: `class Student {\n  // Make these private and add getters/setters\n  public String name;\n  public int grade;\n\n  public Student(String name, int grade) {\n    this.name = name;\n    this.grade = grade;\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Student s = new Student("Leo", 85);\n    // s.grade = 110; // This should not be allowed\n    // Use the setter instead\n  }\n}`,
          },
        ]
      },
      {
        id: 'l17',
        title: 'Inheritance',
        steps: [
          {
            id: 'l17s1',
            type: 'concept',
            title: 'Creating Hierarchies',
            content: "Inheritance allows a new class (subclass) to inherit the properties and methods of an existing class (superclass). This promotes code reuse. We use the `extends` keyword to do this.",
            codeExample: `// Superclass\nclass Animal {\n  void eat() {\n    System.out.println("This animal eats food.");\n  }\n}\n\n// Subclass\nclass Dog extends Animal {\n  void bark() {\n    System.out.println("The dog barks.");\n  }\n}\n\n// Dog now has both eat() and bark() methods.\nDog myDog = new Dog();\nmyDog.eat();`,
            visual: 'inheritance',
          },
          {
            id: 'l17s2',
            type: 'exercise',
            title: 'Extend a Class',
            question: "Make the `Car` class inherit from the `Vehicle` class using the correct keyword.",
            codeTemplate: `class Vehicle {}\n\nclass Car ___ Vehicle {}\n\npublic class Main {\n  public static void main(String[] args) {}\n}`,
            correctAnswer: 'extends',
            hint: 'The keyword for one class to inherit from another is `extends`.'
          },
          {
            id: 'l17s3',
            type: 'practice',
            title: 'Shapes Hierarchy',
            problem: 'Create a `Shape` superclass with a `color` property and a `display()` method that prints the color. Then create a `Circle` subclass that extends `Shape`. The `Circle` should have a `radius` property. In `main`, create a `Circle` object, set its color and radius, and call its `display()` method.',
            initialCode: `// Superclass\nclass Shape {\n  // color property and display method\n}\n\n// Subclass\nclass Circle /* ... */ {\n  // radius property\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    // Create and use a Circle object\n  }\n}`,
          },
        ]
      },
       {
        id: 'l18',
        title: 'Polymorphism & Abstraction',
        steps: [
          {
            id: 'l18s1',
            type: 'concept',
            title: 'One Action, Many Forms',
            content: "Polymorphism means 'many forms'. It allows us to perform a single action in different ways. In Java, this often happens through method overriding, where a subclass provides its own specific implementation of a method that is already defined in its superclass.",
            codeExample: `class Animal {\n  void makeSound() {\n    System.out.println("Animal makes a sound");\n  }\n}\n\nclass Pig extends Animal {\n  // Method overriding\n  void makeSound() {\n    System.out.println("The pig says: wee wee");\n  }\n}\n\nclass Dog extends Animal {\n  // Method overriding\n  void makeSound() {\n    System.out.println("The dog says: bow wow");\n  }\n}`,
          },
          {
            id: 'l18s2',
            type: 'concept',
            title: 'Hiding Complexity with Abstraction',
            content: "Abstraction is about hiding the complex implementation details and showing only the essential features of the object. An `abstract class` is a restricted class that cannot be used to create objects (to access it, it must be inherited from another class). An `abstract method` can only be used in an abstract class, and it does not have a body. The body is provided by the subclass.",
            codeExample: `abstract class Animal { // Abstract class\n  public abstract void animalSound(); // Abstract method (no body)\n}\n\nclass Cat extends Animal {\n  public void animalSound() { // The body is provided here\n    System.out.println("The cat says: meow");\n  }\n}`,
          },
          {
            id: 'l18s3',
            type: 'practice',
            title: 'Polymorphic Shapes',
            problem: 'Create an abstract `Shape` class with an abstract method `draw()`. Then, create two subclasses, `Circle` and `Rectangle`, that extend `Shape`. Implement the `draw()` method in each subclass to print a message like "Drawing a Circle". In `main`, create objects of both `Circle` and `Rectangle` and call their `draw()` methods.',
            initialCode: `// Abstract superclass\nabstract class Shape {\n  // abstract draw method\n}\n\n// Subclasses\nclass Circle extends Shape {\n  // implement draw\n}\n\nclass Rectangle extends Shape {\n  // implement draw\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    // Create objects and call draw()\n  }\n}`,
          },
        ]
      },
      {
        id: 'l18-2',
        title: 'Keywords: static and final',
        steps: [
          {
            id: 'l18-2s1',
            type: 'concept',
            title: 'The `static` Keyword',
            content: "The `static` keyword means a variable or method belongs to the class itself, not to an instance of the class. You can access it using the class name, without creating an object. This is useful for utility methods or constants that are shared by all objects of a class.",
            codeExample: `class MyUtils {\n  public static final double PI = 3.14159;\n\n  public static int add(int a, int b) {\n    return a + b;\n  }\n}\n\n// You don't need to create an object\nSystem.out.println(MyUtils.PI);\nint sum = MyUtils.add(5, 3); // sum is 8`
          },
          {
            id: 'l18-2s2',
            type: 'concept',
            title: 'The `final` Keyword',
            content: "The `final` keyword is used to create constants. A `final` variable's value cannot be changed once it has been assigned. A `final` method cannot be overridden by subclasses. A `final` class cannot be extended.",
            codeExample: `final class Constants {\n  public final int MAX_USERS = 100; // This value cannot be changed\n\n  public final void displayVersion() {\n    System.out.println("Version 1.0");\n  }\n}`
          },
          {
            id: 'l18-2s3',
            type: 'practice',
            title: 'Practice with `static`',
            problem: 'Create a `Counter` class. It should have a `private static int count` variable. Create a public constructor that increments the static count every time a new `Counter` object is created. Also create a public static method `getCount()` that returns the current count. In main, create three `Counter` objects and then print the result of `getCount()` (which should be 3).',
            initialCode: `// Define the Counter class here\n\n\npublic class Main {\n  public static void main(String[] args) {\n    // Create three Counter objects and then get the count\n  }\n}`
          }
        ]
      },
      {
        id: 'l18-3',
        title: 'Section 5 Review',
        steps: [
          {
            id: 'l18-3s1',
            type: 'exercise',
            title: 'Review: Encapsulation',
            question: "To properly encapsulate a class property and hide it from outside access, you should declare it as ___.",
            codeTemplate: `class Employee {\n  ___ String name;\n}`,
            correctAnswer: 'private',
            hint: 'This access modifier restricts visibility to only within the class itself.'
          },
          {
            id: 'l18-3s2',
            type: 'practice',
            title: 'Review: Inheritance & Polymorphism',
            problem: 'Create a `Vehicle` class with a `startEngine()` method that prints "The vehicle engine starts." Create a `Car` class that extends `Vehicle` and overrides `startEngine()` to print "The car engine roars to life." In `main`, create a `Car` object and call its `startEngine()` method.',
            initialCode: `// Define Vehicle and Car classes here\n\n\npublic class Main {\n  public static void main(String[] args) {\n    // Create a Car and start its engine\n  }\n}`
          }
        ]
      }
    ]
  },
  {
    id: 'sec6',
    title: 'Java Collections Framework',
    lessons: [
       {
        id: 'l11',
        title: 'Arrays',
        steps: [
            {
              id: 'l11-cs1',
              type: 'context',
              title: 'Real-World Connection: Organizing Information',
              content: "How does your phone store a list of contacts? Or an e-commerce site store the items in your cart? They use 'Collections'. Collections are objects designed to store and manage groups of data. Learning to use them is essential for any program that handles more than a few pieces of information."
            },
            {
                id: 'l11s1',
                type: 'concept',
                title: 'Storing Collections of Data',
                content: "An array is a data structure that stores a fixed-size collection of elements of the same data type. Think of it as a row of containers. You access each element by its 'index' (position), which starts from 0.",
                codeExample: `// Declare and initialize an array of integers\nint[] scores = { 88, 92, 75, 100 };\n\n// Accessing elements\nSystem.out.println("The first score is: " + scores[0]); // Prints 88\n\n// You can also change elements\nscores[0] = 90; // The first score is now 90`,
                visual: 'array',
            },
            {
                id: 'l11s2',
                type: 'exercise',
                title: 'Access an Array Element',
                question: "Fill in the blank to access and print the second element, 'Banana'.",
                codeTemplate: `public class Main {\n  public static void main(String[] args) {\n    String[] fruits = { "Apple", "Banana", "Cherry" };\n    System.out.println(fruits[___]);\n  }\n}`,
                correctAnswer: '1',
                hint: 'Array indexing starts at 0. So the first element is at index 0, the second is at index 1, and so on.'
            },
            {
                id: 'l11s3',
                type: 'practice',
                title: 'Loop Through an Array',
                problem: 'Create an integer array containing the numbers 10, 20, 30, 40, and 50. Use a `for` loop to iterate through the array and print each number.',
                initialCode: `public class ArrayLoop {\n  public static void main(String[] args) {\n    int[] numbers = { 10, 20, 30, 40, 50 };\n    // Your for loop here\n    // Hint: a loop from i=0 to i < numbers.length\n  }\n}`,
            }
        ]
      },
      {
        id: 'l19',
        title: 'ArrayList',
        steps: [
          {
            id: 'l19s1',
            type: 'concept',
            title: 'Dynamic Lists',
            content: "Unlike a standard array, an `ArrayList` can grow and shrink in size dynamically. It's part of the Java Collections Framework and is incredibly useful. You need to import `java.util.ArrayList` to use it.",
            codeExample: `import java.util.ArrayList;\n\nArrayList<String> cars = new ArrayList<String>();\ncars.add("Volvo");\ncars.add("BMW");\ncars.add("Ford");\n\nSystem.out.println(cars.get(0)); // Get an item\ncars.set(0, "Opel"); // Change an item\ncars.remove(2); // Remove an item\nSystem.out.println(cars.size()); // Get the size`,
            visual: 'arrayList',
          },
          {
            id: 'l19s2',
            type: 'exercise',
            title: 'Add to an ArrayList',
            question: "Fill in the blank to add the string 'Apple' to the `fruits` ArrayList.",
            codeTemplate: `import java.util.ArrayList;\n\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<String> fruits = new ArrayList<String>();\n    fruits.___("Apple");\n    System.out.println(fruits);\n  }\n}`,
            correctAnswer: 'add',
            hint: 'The method to add an element to an ArrayList is `.add()`.'
          },
          {
            id: 'l19s3',
            type: 'practice',
            title: 'Grocery List',
            problem: 'Create a grocery list using an `ArrayList` of `String`s. Add three items to the list. Then, remove the second item. Finally, use a loop to print out all the remaining items in the list.',
            initialCode: `import java.util.ArrayList;\n\npublic class GroceryList {\n  public static void main(String[] args) {\n    // Create ArrayList and add items\n\n    // Remove an item\n\n    // Loop and print items\n  }\n}`,
          },
        ]
      },
      {
        id: 'l20',
        title: 'HashMap',
        steps: [
          {
            id: 'l20s1',
            type: 'concept',
            title: 'Key-Value Pairs',
            content: "A `HashMap` stores items in 'key/value' pairs. You can access an item using its key instead of an index. It's like a dictionary. You need to import `java.util.HashMap`.",
            codeExample: `import java.util.HashMap;\n\nHashMap<String, Integer> studentGrades = new HashMap<String, Integer>();\nstudentGrades.put("John", 95);\nstudentGrades.put("Maria", 88);\nstudentGrades.put("David", 76);\n\nSystem.out.println(studentGrades.get("Maria")); // Get a value by key\nstudentGrades.remove("David"); // Remove a pair by key`,
            visual: 'hashMap',
          },
          {
            id: 'l20s2',
            type: 'exercise',
            title: 'Get a Value',
            question: "Fill in the blank to get the capital of 'England' from the `capitalCities` HashMap.",
            codeTemplate: `import java.util.HashMap;\n\npublic class Main {\n  public static void main(String[] args) {\n    HashMap<String, String> capitalCities = new HashMap<String, String>();\n    capitalCities.put("England", "London");\n    capitalCities.put("Germany", "Berlin");\n\n    System.out.println(capitalCities.___("England"));\n  }\n}`,
            correctAnswer: 'get',
            hint: 'The method to retrieve a value from a HashMap using its key is `.get()`.'
          },
          {
            id: 'l20s3',
            type: 'practice',
            title: 'Inventory Management',
            problem: 'Create an inventory system using a `HashMap` where the key is the item name (`String`) and the value is the quantity (`Integer`). Add three items to your inventory. Then, update the quantity of one item. Finally, loop through the keys of the map and print each item and its quantity.',
            initialCode: `import java.util.HashMap;\n\npublic class Inventory {\n  public static void main(String[] args) {\n    // Create HashMap and add items\n\n    // Update an item's quantity\n\n    // Loop and print inventory\n    // Hint: use a for-each loop on inventory.keySet()\n  }\n}`,
          },
        ]
      },
      {
        id: 'l20-2',
        title: 'Section 6 Review',
        steps: [
          {
            id: 'l20-2s1',
            type: 'exercise',
            title: 'Review: ArrayList Size',
            question: "Which method is used to get the number of elements in an `ArrayList` named `items`?",
            codeTemplate: `import java.util.ArrayList;\n\npublic class Main {\n  public static void main(String[] args) {\n    ArrayList<String> items = new ArrayList<String>();\n    items.add("Item 1");\n    items.add("Item 2");\n    int count = items.___();\n    System.out.println(count);\n  }\n}`,
            correctAnswer: 'size',
            hint: 'It is not `length` like arrays; it is a method call that returns the size.'
          },
          {
            id: 'l20-2s2',
            type: 'practice',
            title: 'Review: Phone Book',
            problem: 'Create a simple phone book using a `HashMap` where the key is the person\'s name (String) and the value is their phone number (String). Add three entries to the phone book, then retrieve and print one person\'s number.',
            initialCode: `import java.util.HashMap;\n\npublic class PhoneBook {\n  public static void main(String[] args) {\n    // Create the HashMap\n\n    // Add entries\n\n    // Retrieve and print a number\n  }\n}`
          }
        ]
      }
    ]
  },
  {
    id: 'sec7',
    title: 'Error Handling with Exceptions',
    lessons: [
      {
        id: 'l21',
        title: 'Exceptions and `try-catch`',
        steps: [
          {
            id: 'l21-cs1',
            type: 'context',
            title: 'Real-World Connection: Building Robust Apps',
            content: "What happens if a user enters text where a number is expected? Or an app loses its internet connection? Without error handling, it would crash. 'Exceptions' are a way to manage these unexpected problems gracefully. Learning this makes the difference between a fragile program and a professional, robust application that can handle real-world chaos."
          },
          {
            id: 'l21s1',
            type: 'concept',
            title: 'Handling a Crisis',
            content: "Sometimes, things go wrong in a program—like trying to divide by zero or accessing a file that doesn't exist. These events are called 'exceptions'. Java's exception handling allows you to gracefully manage these errors instead of letting your program crash. You do this with a `try-catch` block.",
            codeExample: `try {\n  // Block of code to try\n  int result = 10 / 0; // This will cause an error\n} catch (Exception e) {\n  // Block of code to handle errors\n  System.out.println("Something went wrong: " + e.getMessage());\n}`,
          },
          {
            id: 'l21s2',
            type: 'exercise',
            title: 'Catch an Error',
            question: "The code tries to access an array element that doesn't exist. Fill in the blank to catch the potential exception.",
            codeTemplate: `public class Main {\n  public static void main(String[] args) {\n    try {\n      int[] numbers = {1, 2, 3};\n      System.out.println(numbers[10]); // This will fail\n    } ___ (Exception e) {\n      System.out.println("Array index is out of bounds.");\n    }\n  }\n}`,
            correctAnswer: 'catch',
            hint: 'The keyword to define the block that handles an error is `catch`.'
          },
          {
            id: 'l21s3',
            type: 'practice',
            title: 'Safe Number Input',
            problem: 'Write a program that asks the user to enter a number. The `nextInt()` method will throw an exception if the user enters text instead of a number. Use a `try-catch` block to handle this. If the user enters a valid number, print it. If they enter invalid text, print a friendly error message.',
            initialCode: `import java.util.Scanner;\n\npublic class SafeInput {\n  public static void main(String[] args) {\n    Scanner scanner = new Scanner(System.in);\n    System.out.println("Please enter a number:");\n\n    // Your try-catch block here\n  }\n}`,
          },
        ]
      },
      {
        id: 'l21-2',
        title: 'Section 7 Review',
        steps: [
          {
            id: 'l21-2s1',
            type: 'practice',
            title: 'Review: Safe Division',
            problem: 'Create a program that divides two numbers, 10 and 0. Use a `try-catch` block to catch the `ArithmeticException` that occurs from dividing by zero and print a custom error message like "Cannot divide by zero."',
            initialCode: `public class SafeDivision {\n  public static void main(String[] args) {\n    // Your try-catch block here to handle the division\n  }\n}`
          }
        ]
      }
    ]
  },
  {
    id: 'sec8',
    title: 'Advanced Java Concepts',
    lessons: [
      {
        id: 'l22',
        title: 'Interfaces',
        steps: [
          {
            id: 'l22-cs1',
            type: 'context',
            title: 'Real-World Connection: Defining Contracts',
            content: "Think of a USB port. Any device—a mouse, keyboard, or flash drive—can connect to it as long as it follows the USB standard. In Java, an 'interface' is like that standard. It defines a set of methods that a class *must* have, without saying *how* they should work. This is crucial for creating plug-in systems, or allowing different parts of a large application to work together without being tightly linked."
          },
          {
            id: 'l22s1',
            type: 'concept',
            title: 'What is an Interface?',
            content: "An interface is a completely 'abstract' type that is used to group related methods with empty bodies. It's a contract. Any class that claims to implement an interface must provide the implementation for all its methods. You define one with the `interface` keyword.",
            codeExample: `// The contract for any object that can be drawn
interface Drawable {
  public void draw(); // No method body!
}

// This is also a valid interface
interface Animal {
  public void animalSound();
  public void sleep();
}`
          },
          {
            id: 'l22s2',
            type: 'concept',
            title: 'Implementing an Interface',
            content: "A class uses the `implements` keyword to use an interface. It must then provide a body for all the methods defined in the interface. A class can implement multiple interfaces, which is a way to get around Java's limitation of only extending one superclass.",
            codeExample: `class Circle implements Drawable {
  public void draw() {
    System.out.println("Drawing a circle");
  }
}

class Rectangle implements Drawable {
  public void draw() {
    System.out.println("Drawing a rectangle");
  }
}`
          },
          {
            id: 'l22s3',
            type: 'exercise',
            title: 'Implement an Interface',
            question: "Make the `Bird` class use the `Animal` interface with the correct keyword.",
            codeTemplate: `interface Animal {
  public void makeSound();
}

class Bird ___ Animal {
  public void makeSound() {
    System.out.println("Tweet tweet");
  }
}`,
            correctAnswer: 'implements',
            hint: 'The keyword for a class to use an interface is `implements`.'
          },
          {
            id: 'l22s4',
            type: 'practice',
            title: 'Loggable Interface',
            problem: 'Create an interface called `Loggable` with a single method `getLogMessage()` that returns a `String`. Create a `User` class and a `Transaction` class that both implement `Loggable`. The `User` log message should return their name, and the `Transaction` log message should return its amount and status.',
            initialCode: `// Define Loggable interface

// Define User class that implements Loggable

// Define Transaction class that implements Loggable

public class Main {
  public static void main(String[] args) {
    // Create objects and test their getLogMessage() methods
  }
}`
          }
        ]
      },
      {
        id: 'l23',
        title: 'Working with Files (File I/O)',
        steps: [
          {
            id: 'l23-cs1',
            type: 'context',
            title: 'Real-World Connection: Saving Your Work',
            content: "Almost every useful application needs to save and load information. A word processor saves documents, a game saves your progress, and a web server writes log files. Learning to interact with the file system (File Input/Output or I/O) is a fundamental skill for building persistent, real-world applications."
          },
          {
            id: 'l23s1',
            type: 'concept',
            title: 'Writing to a File',
            content: "To write to a file in Java, you can use the `FileWriter` class. You create an object of this class, specifying the filename. Then you can use its `.write()` method. It's crucial to put this code in a `try-catch` block, as file operations can easily fail (e.g., if you don't have permission to write to a location). You should also close the writer when you're done.",
            codeExample: `import java.io.FileWriter; // Import the FileWriter class
import java.io.IOException;  // Import the IOException class to handle errors

try {
  FileWriter myWriter = new FileWriter("filename.txt");
  myWriter.write("Files in Java might be tricky, but it is fun enough!");
  myWriter.close(); // Important to close the file
  System.out.println("Successfully wrote to the file.");
} catch (IOException e) {
  System.out.println("An error occurred.");
  e.printStackTrace();
}`
          },
          {
            id: 'l23s2',
            type: 'concept',
            title: 'Reading from a File',
            content: "To read a file, you can use the `File` class to represent the file, and then pass that `File` object to a `Scanner`. The `Scanner` can then read the file line by line, just like it reads user input from the console. This also requires a `try-catch` block.",
            codeExample: `import java.io.File;  // Import the File class
import java.io.FileNotFoundException;  // Import this class to handle errors
import java.util.Scanner; // Import the Scanner class to read text files

try {
  File myObj = new File("filename.txt");
  Scanner myReader = new Scanner(myObj);
  while (myReader.hasNextLine()) {
    String data = myReader.nextLine();
    System.out.println(data);
  }
  myReader.close();
} catch (FileNotFoundException e) {
  System.out.println("An error occurred.");
  e.printStackTrace();
}`
          },
          {
            id: 'l23s3',
            type: 'exercise',
            title: 'Create a Scanner for a File',
            question: "Fill in the blank to create a `Scanner` object that can read from the `myFile` object.",
            codeTemplate: `import java.io.File;
import java.util.Scanner;
import java.io.FileNotFoundException;

public class Main {
  public static void main(String[] args) {
    try {
      File myFile = new File("document.txt");
      Scanner reader = new ___ (myFile);
    } catch (FileNotFoundException e) { 
      System.out.println("File not found.");
    }
  }
}`,
            correctAnswer: 'Scanner',
            hint: 'You use the `new` keyword followed by the class name to create a new object.'
          },
          {
            id: 'l23s4',
            type: 'practice',
            title: 'Create and Read a To-Do List',
            problem: 'Write a program that does the following: 1. Creates a file named `todo.txt`. 2. Writes three to-do items to the file, each on a new line. 3. Closes the file. 4. Re-opens the file for reading. 5. Reads each line from the file and prints it to the console, prefixed with "To-Do: ".',
            initialCode: `import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class TodoList {
  public static void main(String[] args) {
    // Part 1: Write to the file

    // Part 2: Read from the file
  }
}`
          }
        ]
      },
      {
        id: 'l23-2',
        title: 'Section 8 Review',
        steps: [
          {
            id: 'l23-2s1',
            type: 'exercise',
            title: 'Review: Interfaces',
            question: "A class uses the `___` keyword to declare that it is using an interface.",
            codeTemplate: `interface Movable {}\n\nclass Car ___ Movable {}`,
            correctAnswer: 'implements',
            hint: 'A class extends another class, but it implements an interface.'
          },
          {
            id: 'l23-2s2',
            type: 'practice',
            title: 'Review: Reading a File',
            problem: 'Assume a file named `greeting.txt` exists with the content "Hello from the file!". Write a program that reads the entire content of this file and prints it to the console. Make sure to handle potential `FileNotFoundException` errors.',
            initialCode: `import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class FileReaderApp {
  public static void main(String[] args) {
    // Your code to read the file here
  }
}`
          }
        ]
      }
    ]
  },
  {
    id: 'sec9',
    title: 'Putting It All Together: Final Project',
    lessons: [
      {
        id: 'l24',
        title: 'Project: Simple Bank Account System',
        steps: [
          {
            id: 'l24-cs1',
            type: 'context',
            title: 'Your Capstone Project',
            content: "It's time to combine everything you've learned! In this final project, you will build a simple command-line banking application. This will use classes, objects, collections, user input, and control flow. It's a fantastic way to see how all the pieces fit together to create a real, working program."
          },
          {
            id: 'l24s1',
            type: 'practice',
            title: 'Step 1: The `BankAccount` Class',
            problem: 'Create a `BankAccount` class. It should have private properties for `accountNumber` (String) and `balance` (double). Use encapsulation: create a constructor to initialize these properties and public getter methods for both. Also create `deposit(double amount)` and `withdraw(double amount)` methods. The `withdraw` method should not allow the balance to go below zero.',
            initialCode: `// Define the BankAccount class here

public class Main {
    public static void main(String[] args) {
        // You can test your class here if you want
        // BankAccount acc = new BankAccount("123", 500.0);
        // acc.deposit(100);
        // System.out.println(acc.getBalance());
    }
}`
          },
          {
            id: 'l24s2',
            type: 'practice',
            title: 'Step 2: The `Bank` Class',
            problem: 'Create a `Bank` class to manage multiple accounts. It should use a `HashMap` to store `BankAccount` objects, where the key is the `accountNumber` (String). Create the following methods: `addAccount(BankAccount account)`, `getAccount(String accountNumber)`, and `depositToAccount(String accountNumber, double amount)`.',
            initialCode: `import java.util.HashMap;

// You'll need your BankAccount class from the previous step

class Bank {
    // HashMap to store accounts
    
    // addAccount method
    
    // getAccount method
    
    // depositToAccount method
}`
          },
          {
            id: 'l24s3',
            type: 'practice',
            title: 'Step 3: The Main Application',
            problem: 'Create a main application class that allows a user to interact with the bank. Use a `Scanner` for input and a `while` loop to create a menu with options like "1. Create Account", "2. Check Balance", "3. Exit". This will be the most complex step, combining control flow and your OOP classes.',
            initialCode: `import java.util.Scanner;
// You'll need your BankAccount and Bank classes

public class BankApp {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Bank myBank = new Bank();
        
        // Your while loop and menu logic here
        
        System.out.println("Thank you for using BankApp!");
    }
}`
          },
          {
            id: 'l24s4',
            type: 'concept',
            title: 'Congratulations!',
            content: "You've successfully built a complete Java application from scratch! You used Object-Oriented principles to model bank accounts, the Collections Framework to manage them, and Control Flow to create an interactive user menu. This project demonstrates a strong foundation in the core concepts of Java programming. Well done!"
          }
        ]
      }
    ]
  }
];