
export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Open';
  initialCode: string;
  instructions: string;
  type: 'bank' | 'vending' | 'smarthome' | 'todo' | 'custom'; // Extensible for future project types
  poster?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'custom-playground',
    title: 'Create from Scratch',
    description: 'A blank canvas for your ideas. Write any Java code you want, experiment with algorithms, or practice specific concepts without a predefined mission.',
    difficulty: 'Open',
    type: 'custom',
    instructions: `
**Your Sandbox**
This is a free-form coding environment. You can write any valid Java code here.

**How Input Works:**
The panel on the right acts as your **System Input**. 
1. If your code uses \`Scanner\` to read input (e.g., \`scanner.nextLine()\`), type that text into the input box on the right and click **Run with Input**.
2. The AI runner will execute your code using that text as the input.

**Ideas to try:**
- Write a calculator.
- Create a text-based adventure game.
- Practice loop patterns (stars, pyramids).
- Test out Java Collections (ArrayList, HashMap).
    `,
    initialCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from your custom project!");
        
        // Example of reading input:
        // Scanner scanner = new Scanner(System.in);
        // System.out.println("Type something on the right:");
        // String input = scanner.nextLine();
        // System.out.println("You typed: " + input);
    }
}`
  },
  {
    id: 'todo-list',
    title: 'Simple To-Do List',
    description: 'Create a digital notepad from scratch. The UI is just a blank display and a command line. You must write the Java code to handle commands like "ADD" and "CHECK".',
    difficulty: 'Beginner',
    type: 'todo',
    poster: 'https://cdn.dribbble.com/userupload/43200352/file/original-518d53d89cc2dafb62bfb7d9a97c145f.png?resize=752x&vertical=center',
    instructions: `
**Mission:**
The screen on the right is blank. It only displays what your code prints. You have a command line at the bottom to send instructions.

**The Protocol:**
The System sends you the **Current State** followed by the **Raw Command Line** typed by the user.
Input Format:
Line 1: \`<Total_Number_Of_Lines>\`
Line 2..N: \`<Existing_Line_Text>\`
Line N+1: \`<USER_TYPED_STRING>\`

**Your Job:**
1. **Preserve State**: Read the count and existing lines. Print them back immediately. If you don't print them, they are deleted!
2. **Read Input**: Read the user's input string.
3. **Parse Command**: Check if the input starts with "ADD" or "CHECK".
4. **Execute**:
   - If "ADD <text>": Print a new line \`[ ] <text>\`.
   - If "CHECK <index>": When printing the existing lines, change \`[ ]\` to \`[x]\` for that index.

**Tip for Scanner:**
After using \`scanner.nextInt()\` to read the count, the "newline" character is still waiting. You must call \`scanner.nextLine()\` once to consume it before reading the text lines.

**Example Flow:**
- User types: \`ADD Buy Milk\`
- Input to Java: \`0\` (count) -> \`ADD Buy Milk\`
- Java Output: \`[ ] Buy Milk\`

- User types: \`CHECK 0\`
- Input to Java: \`1\` -> \`[ ] Buy Milk\` -> \`CHECK 0\`
- Java Output: \`[x] Buy Milk\`
    `,
    initialCode: `import java.util.Scanner;

public class TodoList {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 1. Read count of existing items
        
        // 2. Consume the leftover newline
        // scanner.nextLine(); 
        
        // 3. Loop through existing items
        //    (Store them or print them back immediately)
        
        // 4. Read the User's Command Line
        
        // 5. Parse and Execute (ADD or CHECK)
        
    }
}`
  },
  {
    id: 'smart-home',
    title: 'Smart Home Controller',
    description: 'Your first system! Write the code to control a smart home dashboard. You will learn to manage state (on/off, temperature) and respond to user commands.',
    difficulty: 'Beginner',
    type: 'smarthome',
    poster: 'https://cdn.dribbble.com/userupload/13481012/file/original-7797563b6fe92fcdfa89607a93b49642.png?resize=1504x1128&vertical=center',
    instructions: `
**Mission:**
Bring this Smart Home Dashboard to life! The buttons on the right send commands to your code.

**The Protocol:**
Since the code restarts for every command, the Hub (UI) sends you the **Current State** first, followed by the **Command**.
Input Format: \`<Light_State_0_or_1> <Temp_Int> <Armed_State_0_or_1> <Command_String>\`

**Step-by-Step Guide:**

**Step 1: Read State**
The variables are already set up to read the initial state from \`Scanner\`.
- 0 or 1 for Light (convert to boolean)
- Integer for Temperature
- 0 or 1 for Security (convert to boolean)

**Step 2: Handle Commands**
Inside the loop, check \`command\`:
- \`TOGGLE_LIGHT\`: Flip \`isLightOn\`.
- \`TEMP_UP\` / \`TEMP_DOWN\`: Change \`temperature\`.
- \`TOGGLE_SECURITY\`: Flip \`isArmed\`.

**Step 3: Print Output**
After processing, print the *new* state using these exact prefixes so the UI can update:
- \`LIGHT: ON\` or \`LIGHT: OFF\`
- \`TEMP: <number>\`
- \`SECURITY: ARMED\` or \`SECURITY: DISARMED\`

**Example:**
- Input: \`0 22 0 TOGGLE_LIGHT\` (Light was OFF)
- Your Code Prints: \`LIGHT: ON\` \`TEMP: 22\` \`SECURITY: DISARMED\`
    `,
    initialCode: `import java.util.Scanner;

public class SmartHomeHub {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 1. Read Current State from the Hub
        // The UI sends 3 numbers first: Light(0/1) Temp(int) Armed(0/1)
        int lightState = scanner.nextInt();
        int tempState = scanner.nextInt();
        int armedState = scanner.nextInt();
        
        // Convert to usable variables
        boolean isLightOn = (lightState == 1);
        int temperature = tempState;
        boolean isArmed = (armedState == 1);

        // 2. Read the Command
        if (scanner.hasNext()) {
            String command = scanner.next();

            // --- YOUR CODE STARTS HERE ---
            
            if (command.equals("TOGGLE_LIGHT")) {
                 // Toggle the light variable
                 isLightOn = !isLightOn;
            }
            else if (command.equals("TEMP_UP")) {
                // Increase temp
                temperature++;
            }
            // Add TEMP_DOWN logic here
            
            
            // Add TOGGLE_SECURITY logic here
            
        }
        
        // 3. Send New State back to Hub
        System.out.println("LIGHT: " + (isLightOn ? "ON" : "OFF"));
        System.out.println("TEMP: " + temperature);
        System.out.println("SECURITY: " + (isArmed ? "ARMED" : "DISARMED"));
    }
}`
  },
  {
    id: 'bank-system',
    title: 'Bank App Backend',
    description: 'Build the backend logic for a mobile banking application. You will create a system to handle deposits, withdrawals, and balance checks. The interactive phone interface on the right will talk to your Java code!',
    difficulty: 'Intermediate',
    type: 'bank',
    poster: 'https://cdn.dribbble.com/userupload/8735209/file/original-854fd5984ae4e95cb0be7c472e8cc872.png?resize=752x&vertical=center',
    instructions: `
**Mission:**
Program the brain of this ATM. The interface sends commands to your code, and your code must print the correct response.

**Commands to Handle:**
1. \`BALANCE\`: Print the current balance.
   - Expected Output Format: \`BALANCE: <amount>\` (e.g., \`BALANCE: 1000\`)
2. \`DEPOSIT <amount>\`: Add the amount to the balance.
   - Expected Output Format: \`SUCCESS: Deposited <amount>\` and then the new balance line.
3. \`WITHDRAW <amount>\`: Subtract amount.
   - Logic: Check if balance is sufficient.
   - Success Output: \`SUCCESS: Withdrew <amount>\`
   - Failure Output: \`ERROR: Insufficient funds\`

**Note:** 
Since the code runs freshly for each command in this simulator, you might need to cheat a little and simulate the "database" by hardcoding the starting balance or calculating based on inputs. 
For this exercise, assume the 'Database' starts at 1000.
    `,
    initialCode: `import java.util.Scanner;

public class BankBackend {
    public static void main(String[] args) {
        // Simulated Database Balance
        double balance = 1000.00;
        
        Scanner scanner = new Scanner(System.in);
        
        // Read the command from the interface (e.g., "DEPOSIT 500")
        if (scanner.hasNext()) {
            String command = scanner.next();
            
            if (command.equals("BALANCE")) {
                System.out.println("BALANCE: " + balance);
            } 
            else if (command.equals("DEPOSIT")) {
                if (scanner.hasNextDouble()) {
                    double amount = scanner.nextDouble();
                    // TODO: Update balance and print success message
                    // Don't forget to print the new balance line too!
                    
                }
            }
            else if (command.equals("WITHDRAW")) {
                // TODO: Implement withdraw logic
                
            }
            else {
                System.out.println("ERROR: Unknown command");
            }
        }
    }
}`
  },
  {
    id: 'vending-machine',
    title: 'Smart Vending Machine',
    description: 'Program the embedded logic for a digital vending machine. Manage credit, handle product selection codes (A1, B2), and trigger the dispensing mechanism.',
    difficulty: 'Advanced',
    type: 'vending',
    poster: 'https://hahasmartvending.com/wp-content/uploads/2024/10/Insert-credit-card.jpg.webp',
    instructions: `
**Mission:**
You are writing the firmware for a vending machine. The hardware (the UI on the right) maintains the money state, but it asks YOUR code what to do next.

**The Protocol:**
The hardware always sends you the **Current Credit** (in cents) first, followed by the **Command**.
Input Format: \`<Current_Credit_Int> <Command_String> [Optional_Parameter]\`

**Commands to Handle:**
1. \`INSERT <amount>\`: User inserted a coin/bill.
   - Logic: Add amount to current credit.
   - Output: \`CREDIT: <new_total>\` and \`MSG: Credit: <new_total>\`
   
2. \`SELECT <code_string>\`: User typed a code (e.g., "A1").
   - Logic: Check if credit >= price. 
     - Prices: A1 (Chips)=150, A2 (Soda)=200, B1 (Candy)=100, B2 (Water)=125.
   - Success: Output \`DISPENSE: <item_name>\`, \`CREDIT: <remaining_credit>\`, and \`MSG: Enjoy!\`.
   - Failure: Output \`MSG: Need <diff> more\`.

3. \`REFUND\`: User wants money back.
   - Output: \`REFUND: <current_credit>\`, \`CREDIT: 0\`, and \`MSG: Insert Coin\`.

**Example Interaction:**
- Input: \`0 INSERT 25\` -> Your Code Prints: \`CREDIT: 25\` \`MSG: Bal: 25\`
- Input: \`150 SELECT A1\` -> Your Code Prints: \`DISPENSE: Chips\` \`CREDIT: 0\` \`MSG: Enjoy\`
    `,
    initialCode: `import java.util.Scanner;

public class VendingFirmware {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 1. Read the Hardware State (Current Credit)
        if (scanner.hasNextInt()) {
            int currentCredit = scanner.nextInt();
            
            // 2. Read the User Command
            if (scanner.hasNext()) {
                String command = scanner.next();
                
                if (command.equals("INSERT")) {
                    int amount = scanner.nextInt();
                    int newTotal = currentCredit + amount;
                    System.out.println("CREDIT: " + newTotal);
                    System.out.println("MSG: Credit: " + newTotal);
                }
                else if (command.equals("SELECT")) {
                    String code = scanner.next();
                    
                    // TODO: Implement pricing logic
                    // A1=150, A2=200, B1=100, B2=125
                    
                    if (code.equals("A1")) {
                        int price = 150;
                        if (currentCredit >= price) {
                            // Success
                            System.out.println("DISPENSE: Chips");
                            System.out.println("CREDIT: " + (currentCredit - price));
                            System.out.println("MSG: Enjoy your Chips!");
                        } else {
                            // Fail
                            System.out.println("MSG: Need " + (price - currentCredit) + " more");
                        }
                    }
                    // TODO: Add other items (A2, B1, B2)
                    else {
                        System.out.println("MSG: Invalid Code");
                    }
                }
                else if (command.equals("REFUND")) {
                    // TODO: Handle refund
                    System.out.println("MSG: Returning coins...");
                }
            }
        }
    }
}`
  }
];
