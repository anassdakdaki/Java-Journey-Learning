
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'website' | 'book';
  url: string; // URL for link or YouTube Embed ID
  thumbnail?: string; // For books or sites
  author?: string;
}

export const YOUTUBE_RESOURCES: Resource[] = [
  {
    id: 'yt1',
    title: 'Learn Java 8 - Full Tutorial (FreeCodeCamp)',
    author: 'FreeCodeCamp',
    description: 'A complete 9-hour course perfect for beginners. It covers everything from installation to object-oriented programming.',
    type: 'video',
    url: 'grEKMHGYyns'
  },
  {
    id: 'yt2',
    title: 'Java Full Course (Bro Code)',
    author: 'Bro Code',
    description: 'A comprehensive 12-hour course covering everything from variables to advanced OOP and data structures. Great for a deep dive.',
    type: 'video',
    url: 'xk4_1vDrzzo'
  },
  {
    id: 'yt3',
    title: 'Object Oriented Programming (Alex Lee)',
    author: 'Alex Lee',
    description: 'A very clear and concise explanation of OOP concepts in Java. Alex breaks down Classes, Objects, and how they relate in simple terms.',
    type: 'video',
    url: 'rrMatsIYseQ'
  },
  {
    id: 'yt4',
    title: 'Data Structures & Algorithms (FreeCodeCamp)',
    author: 'William Fiset / FreeCodeCamp',
    description: 'Once you know the syntax, you need to understand data. This course covers Arrays, Linked Lists, Stacks, Queues, Trees, and more.',
    type: 'video',
    url: 'RBSGKlAvoiM'
  },
  {
    id: 'yt5',
    title: 'Java GUI (Swing) Tutorial (Bro Code)',
    author: 'Bro Code',
    description: 'Want to build desktop apps with buttons and windows? This tutorial teaches you Java Swing to create visual interfaces.',
    type: 'video',
    url: 'Kmgo00avvEw'
  },
  {
    id: 'yt6',
    title: 'Spring Boot for Beginners (Amigoscode)',
    author: 'Amigoscode',
    description: 'Ready for the big leagues? Spring Boot is the most popular Java framework for building web servers and APIs.',
    type: 'video',
    url: '9SGDpanrc8U'
  }
];

export const WEBSITE_RESOURCES: Resource[] = [
  {
    id: 'web1',
    title: 'Oracle Java Documentation',
    description: 'The official source of truth. It can be dry, but it is the most accurate reference for looking up Class methods and API details.',
    type: 'website',
    url: 'https://docs.oracle.com/en/java/'
  },
  {
    id: 'web2',
    title: 'Baeldung',
    description: 'The gold standard for Java articles. If you need to know how to do a specific task (e.g., "How to convert String to Int"), Baeldung usually has the best guide.',
    type: 'website',
    url: 'https://www.baeldung.com/'
  },
  {
    id: 'web3',
    title: 'Hyperskill (JetBrains Academy)',
    description: 'An interactive project-based learning platform by the creators of IntelliJ IDEA. Highly recommended for hands-on practice.',
    type: 'website',
    url: 'https://hyperskill.org/'
  },
  {
    id: 'web4',
    title: 'W3Schools Java',
    description: 'Simple, bite-sized tutorials with a "Try it Yourself" editor. Good for quick syntax references.',
    type: 'website',
    url: 'https://www.w3schools.com/java/'
  }
];

export const BOOK_RESOURCES: Resource[] = [
  {
    id: 'bk1',
    title: 'Head First Java',
    author: 'Kathy Sierra & Bert Bates',
    description: 'Not your typical textbook. It uses puzzles, mysteries, and strong visuals to engage your brain. The best book for absolute beginners.',
    type: 'book',
    url: 'https://www.oreilly.com/library/view/head-first-java/0596009208/'
  },
  {
    id: 'bk2',
    title: 'Effective Java',
    author: 'Joshua Bloch',
    description: 'The "Bible" for intermediate Java developers. It teaches you not just how to write Java, but how to write *good* Java using best practices.',
    type: 'book',
    url: 'https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/'
  }
];
