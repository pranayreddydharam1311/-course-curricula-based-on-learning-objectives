import { CourseCurriculum } from '../types/curriculum.ts';

export interface ObjectivePreset {
  id: string;
  title: string;
  category: string;
  objectives: string;
  targetAudience: string;
  duration: string;
  weeklyHours: number;
  deliveryFormat: string;
  prerequisites: string;
  industryAlignment: string;
  iconName: string;
}

export const PRESET_OBJECTIVES: ObjectivePreset[] = [
  {
    id: 'python-basics',
    title: 'Python Programming & App Development',
    category: 'Computer Science',
    objectives: 'Students should understand Python programming, master syntax, data structures, object-oriented concepts, and develop basic real-world applications with database integration.',
    targetAudience: 'Beginner to Intermediate programmers',
    duration: '8-weeks',
    weeklyHours: 6,
    deliveryFormat: 'Blended (Lectures & Coding Labs)',
    prerequisites: 'Basic computer literacy and logical problem-solving.',
    industryAlignment: 'Entry-level Python Developer & Data Automation',
    iconName: 'Code',
  },
  {
    id: 'fullstack-web',
    title: 'Full-Stack Modern Web Engineering',
    category: 'Software Engineering',
    objectives: 'Master modern frontend (React, TypeScript, Tailwind) and backend (RESTful APIs, Node.js, relational databases), authentication, and continuous deployment of production-ready web apps.',
    targetAudience: 'Aspiring Full-Stack Software Engineers',
    duration: '12-weeks',
    weeklyHours: 10,
    deliveryFormat: 'Intensive Project-Based Bootcamp',
    prerequisites: 'Basic HTML, CSS, and basic JavaScript knowledge.',
    industryAlignment: 'Junior-to-Mid Full-Stack Web Developer roles',
    iconName: 'Globe',
  },
  {
    id: 'ai-data-science',
    title: 'Applied AI & Machine Learning Foundations',
    category: 'Artificial Intelligence',
    objectives: 'Learn data analysis with Pandas/NumPy, statistical learning, supervised & unsupervised machine learning models, model evaluation, and deployment of predictive AI models.',
    targetAudience: 'Data analysts, STEM students, and software engineers',
    duration: '10-weeks',
    weeklyHours: 8,
    deliveryFormat: 'Hands-on Labs & Case Studies',
    prerequisites: 'Foundational algebra, basic Python knowledge.',
    industryAlignment: 'Associate Data Scientist & Machine Learning Engineer',
    iconName: 'Cpu',
  },
  {
    id: 'ux-ui-design',
    title: 'UX/UI Product Design & Design Systems',
    category: 'Design & Product',
    objectives: 'Conduct user research, create wireframes and high-fidelity interactive prototypes in Figma, build accessible design systems, and validate through usability testing.',
    targetAudience: 'Career switchers and digital designers',
    duration: '6-weeks',
    weeklyHours: 6,
    deliveryFormat: 'Studio Critique & Interactive Workshops',
    prerequisites: 'No prior design tool experience required.',
    industryAlignment: 'Junior Product Designer / UX Researcher',
    iconName: 'Palette',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Defense & Network Security',
    category: 'Security & IT',
    objectives: 'Understand networking fundamentals, threat modeling, vulnerability scanning, security audits, identity management, and incident response procedures.',
    targetAudience: 'IT administrators and aspiring security analysts',
    duration: '8-weeks',
    weeklyHours: 7,
    deliveryFormat: 'Virtual Sandbox Labs & Threat Simulations',
    prerequisites: 'Basic understanding of computer networks and operating systems.',
    industryAlignment: 'CompTIA Security+ and SOC Analyst Tier 1',
    iconName: 'Shield',
  },
];

// High quality exemplar preloaded curriculum (matching user example in prompt!)
export const SAMPLE_PYTHON_CURRICULUM: CourseCurriculum = {
  id: 'sample_python_101',
  title: 'Python Programming: From Core Syntax to Real-World Applications',
  tagline: 'A rigorous hands-on journey from fundamental logic to full-fledged object-oriented Python applications.',
  originalObjectives: 'Students should understand Python programming and develop basic applications.',
  courseDescription: 'This curriculum provides a structured, progressive pathway through Python software development. Students start with core syntax, conditional logic, and algorithmic thinking before advancing to data structures, modular programming, and object-oriented paradigms. The course culminates in building an end-to-end practical application that interacts with files, APIs, and persistent storage.',
  targetAudience: 'Beginner to Intermediate learners, students, and engineers seeking Python fluency.',
  estimatedTotalHours: 48,
  duration: '8-weeks',
  difficultyLevel: 'Comprehensive (Beginner to Advanced)',
  deliveryFormat: 'Blended (Interactive Lectures & Hands-on Coding Labs)',
  prerequisites: [
    'Basic computer literacy and file system management',
    'No prior programming background required',
  ],
  keyTakeaways: [
    'Write clean, idiomatic Python code conforming to PEP 8 standards',
    'Design complex data models using Object-Oriented Programming (OOP)',
    'Handle file operations, JSON data, and runtime exceptions robustly',
    'Build and test modular applications and interact with external data sources',
    'Architect a complete capstone project with automated unit tests',
  ],
  industryAlignment: 'Prepares learners for junior software engineering roles and entry-level Python developer certifications.',
  generatedAt: '2026-09-26T21:20:00Z',
  modules: [
    {
      id: 'mod_1',
      moduleNumber: 1,
      title: 'Python Basics & Development Environment',
      level: 'Foundational',
      durationWeeksOrHours: 'Week 1 (6 Hours)',
      overview: 'Introduction to the Python runtime, installing IDEs (VS Code/PyCharm), interactive shell, print statements, code indentation, and basic syntax rules.',
      learningOutcomes: [
        { outcome: 'Configure a local Python development environment with virtual environments', bloomsLevel: 'Apply' },
        { outcome: 'Explain the role of the Python interpreter and byte-code execution', bloomsLevel: 'Understand' },
        { outcome: 'Write and execute simple script files with proper formatting', bloomsLevel: 'Apply' }
      ],
      subtopics: [
        {
          id: 'sub_1_1',
          title: 'Environment Setup & Virtualenv',
          description: 'Installing Python, VS Code extensions, and managing isolated virtual environments.',
          estimatedHours: 2,
          keyConcepts: ['Python Interpreter', 'pip package manager', 'venv', 'CLI execution'],
          teachingMethod: 'lab'
        },
        {
          id: 'sub_1_2',
          title: 'First Scripts, Comments & PEP 8',
          description: 'Writing scripts, utilizing comments, understanding the REPL, and adhering to PEP 8 readability standards.',
          estimatedHours: 2,
          keyConcepts: ['Syntax grammar', 'Indentation', 'Comments', 'PEP 8 guidelines'],
          teachingMethod: 'lecture'
        },
        {
          id: 'sub_1_3',
          title: 'Debugging & Standard I/O',
          description: 'Capturing user input with input(), formatted printing with f-strings, and interpreting syntax errors.',
          estimatedHours: 2,
          keyConcepts: ['Standard Input/Output', 'f-strings', 'Error stack traces'],
          teachingMethod: 'hands-on-coding'
        }
      ],
      assessments: [
        {
          id: 'as_1_1',
          type: 'Quiz',
          title: 'Python Environment & Syntax Essentials',
          description: '10-question multiple choice quiz on interpreter basics, comments, and input/output.',
          weightPercentage: 5,
          samplePromptOrQuestions: ['What is the output of print(f"{2+3*4}") in Python?', 'Why does Python rely on indentation instead of braces?']
        },
        {
          id: 'as_1_2',
          type: 'Lab Exercise',
          title: 'Interactive CLI Greeting & System Info Script',
          description: 'Write a script that prompts for user details, computes birth year from age, and prints a formatted summary card.',
          weightPercentage: 5
        }
      ],
      resources: [
        { title: 'Python Official Documentation: Tutorial', type: 'Documentation', linkOrDesc: 'https://docs.python.org/3/tutorial/' },
        { title: 'PEP 8 Style Guide for Python Code', type: 'Reading', linkOrDesc: 'https://peps.python.org/pep-0008/' }
      ]
    },
    {
      id: 'mod_2',
      moduleNumber: 2,
      title: 'Variables, Data Types & Operators',
      level: 'Foundational',
      durationWeeksOrHours: 'Week 2 (6 Hours)',
      overview: 'Deep dive into Python primitive data types (int, float, str, bool), type casting, arithmetic, comparison, and boolean logical operators.',
      learningOutcomes: [
        { outcome: 'Identify and apply appropriate scalar data types for problem-solving', bloomsLevel: 'Understand' },
        { outcome: 'Perform safe explicit type conversions and handle edge cases', bloomsLevel: 'Apply' },
        { outcome: 'Formulate compound boolean expressions using logical operators', bloomsLevel: 'Analyze' }
      ],
      subtopics: [
        {
          id: 'sub_2_1',
          title: 'Numeric Types & Arithmetic Operations',
          description: 'Integer division, modulus, exponentiation, float precision caveats, and math standard module.',
          estimatedHours: 2,
          keyConcepts: ['int vs float', 'Floor division //', 'Modulo %', 'math library'],
          teachingMethod: 'lecture'
        },
        {
          id: 'sub_2_2',
          title: 'String Manipulation & Slicing',
          description: 'Indexing, slicing [start:stop:step], immutability, string methods (split, join, strip, replace).',
          estimatedHours: 2,
          keyConcepts: ['String immutability', 'Negative indexing', 'Slicing syntax', 'Common string methods'],
          teachingMethod: 'hands-on-coding'
        },
        {
          id: 'sub_2_3',
          title: 'Booleans & Truthiness Evaluation',
          description: 'Truth value testing, logical and/or/not operators, short-circuit evaluation, comparison operators.',
          estimatedHours: 2,
          keyConcepts: ['Falsy values', 'Logical short-circuiting', 'Identity (is) vs Equality (==)'],
          teachingMethod: 'lab'
        }
      ],
      assessments: [
        {
          id: 'as_2_1',
          type: 'Assignment',
          title: 'Financial Compound Interest & Currency Formatter',
          description: 'Build a financial calculation program that takes principal, rate, time, and formats results with currency symbols and rounding.',
          weightPercentage: 10
        }
      ],
      resources: [
        { title: 'Python Standard Types Reference', type: 'Documentation' }
      ]
    },
    {
      id: 'mod_3',
      moduleNumber: 3,
      title: 'Conditions & Loops (Control Flow)',
      level: 'Core',
      durationWeeksOrHours: 'Week 3 (6 Hours)',
      overview: 'Directing program execution using if, elif, else branch logic, match-case statements, while loops, for loops with range(), and loop control statements.',
      learningOutcomes: [
        { outcome: 'Implement branched execution paths based on dynamic input conditions', bloomsLevel: 'Apply' },
        { outcome: 'Construct deterministic and condition-driven iterative loops', bloomsLevel: 'Apply' },
        { outcome: 'Optimize loop performance and avoid infinite loops using break and continue', bloomsLevel: 'Evaluate' }
      ],
      subtopics: [
        {
          id: 'sub_3_1',
          title: 'Conditional Branching & Structural Pattern Matching',
          description: 'Nested conditionals, ternary operator, match-case (Python 3.10+).',
          estimatedHours: 2,
          keyConcepts: ['if/elif/else hierarchy', 'Ternary expressions', 'Pattern matching'],
          teachingMethod: 'lecture'
        },
        {
          id: 'sub_3_2',
          title: 'For Loops & Iteration Tools',
          description: 'Iterating over sequences, range() generation, enumerate(), and zip().',
          estimatedHours: 2,
          keyConcepts: ['Iterables', 'range() parameters', 'enumerate()', 'zip()'],
          teachingMethod: 'hands-on-coding'
        },
        {
          id: 'sub_3_3',
          title: 'While Loops & Control Statements',
          description: 'Event-driven iteration, loop sentinel flags, break, continue, and loop else clauses.',
          estimatedHours: 2,
          keyConcepts: ['Sentinel loops', 'Loop interruption (break)', 'Cycle continuation (continue)'],
          teachingMethod: 'lab'
        }
      ],
      assessments: [
        {
          id: 'as_3_1',
          type: 'Lab Exercise',
          title: 'Automated Number Guessing Game with AI Feedback',
          description: 'Implement a console game that tracks attempts, gives higher/lower feedback, validates user inputs, and prints stats upon completion.',
          weightPercentage: 10
        }
      ],
      resources: [
        { title: 'Control Flow Tools in Python Guide', type: 'Reading' }
      ]
    },
    {
      id: 'mod_4',
      moduleNumber: 4,
      title: 'Functions, Scope & Modular Code',
      level: 'Core',
      durationWeeksOrHours: 'Week 4 (6 Hours)',
      overview: 'Writing reusable code through functions, positional and keyword arguments, default values, *args and **kwargs, variable scopes, lambda expressions, and modules.',
      learningOutcomes: [
        { outcome: 'Design modular functions following the Single Responsibility Principle', bloomsLevel: 'Create' },
        { outcome: 'Explain variable scope resolution under the LEGB (Local, Enclosing, Global, Built-in) rule', bloomsLevel: 'Analyze' },
        { outcome: 'Organize code into reusable custom modules and packages', bloomsLevel: 'Apply' }
      ],
      subtopics: [
        {
          id: 'sub_4_1',
          title: 'Function Signatures & Parameter Handling',
          description: 'Defining functions, return statements, default arguments, positional-only and keyword-only arguments.',
          estimatedHours: 2,
          keyConcepts: ['def statement', 'return values vs None', 'Default parameter traps'],
          teachingMethod: 'lecture'
        },
        {
          id: 'sub_4_2',
          title: 'Variadic Arguments & Lambda Expressions',
          description: 'Using *args and **kwargs for flexible signatures, anonymous functions (lambda), map and filter.',
          estimatedHours: 2,
          keyConcepts: ['Argument unpacking', '*args & **kwargs', 'Lambda syntax'],
          teachingMethod: 'hands-on-coding'
        },
        {
          id: 'sub_4_3',
          title: 'Variable Scope & Custom Modules',
          description: 'LEGB rule, global and nonlocal keywords, creating .py modules, importing functions, and __name__ == "__main__".',
          estimatedHours: 2,
          keyConcepts: ['LEGB scope hierarchy', 'import semantics', '__name__ idiom'],
          teachingMethod: 'lab'
        }
      ],
      assessments: [
        {
          id: 'as_4_1',
          type: 'Assignment',
          title: 'Modular Unit Conversion & Mathematical Toolkit',
          description: 'Create a multi-file Python module offering metric/imperial conversions, statistical computations, and a CLI test suite.',
          weightPercentage: 10
        }
      ],
      resources: [
        { title: 'Python Functions and Scope In-Depth', type: 'Documentation' }
      ]
    },
    {
      id: 'mod_5',
      moduleNumber: 5,
      title: 'Data Collections: Lists, Tuples, Sets & Dictionaries',
      level: 'Intermediate',
      durationWeeksOrHours: 'Week 5 (6 Hours)',
      overview: 'Mastering Python rich built-in data collections, choosing optimal collections for space/time complexity, and elegant list and dictionary comprehensions.',
      learningOutcomes: [
        { outcome: 'Select the optimal data structure based on mutability, ordering, and lookup efficiency', bloomsLevel: 'Evaluate' },
        { outcome: 'Implement nested data models representing complex real-world entities', bloomsLevel: 'Apply' },
        { outcome: 'Write expressive, performant comprehensions for data filtering and transformation', bloomsLevel: 'Create' }
      ],
      subtopics: [
        {
          id: 'sub_5_1',
          title: 'Lists & Tuples Deep Dive',
          description: 'List mutation, memory models, shallow vs deep copying, tuple immutability and packing/unpacking.',
          estimatedHours: 2,
          keyConcepts: ['List methods (append, extend, pop)', 'Tuple unpacking', 'copy.deepcopy'],
          teachingMethod: 'lecture'
        },
        {
          id: 'sub_5_2',
          title: 'Dictionaries & Hash Maps',
          description: 'Key-value pairs, hashable key constraints, dict methods (get, items, keys, values), default values.',
          estimatedHours: 2,
          keyConcepts: ['Hash tables & O(1) lookup', 'dict.get() safety', 'Nested dictionaries'],
          teachingMethod: 'hands-on-coding'
        },
        {
          id: 'sub_5_3',
          title: 'Sets & Advanced Comprehensions',
          description: 'Set theory operations (union, intersection, difference), list/dict/set comprehensions with conditional filtering.',
          estimatedHours: 2,
          keyConcepts: ['Set uniqueness', 'Venn diagram operations', 'Comprehension syntax'],
          teachingMethod: 'lab'
        }
      ],
      assessments: [
        {
          id: 'as_5_1',
          type: 'Milestone Project',
          title: 'Student Gradebook & Analytics Engine',
          description: 'Build an in-memory gradebook using nested dictionaries and sets. Calculate grade distributions, averages, and generate ranked report cards.',
          weightPercentage: 15
        }
      ],
      resources: [
        { title: 'Python Data Structures Official Documentation', type: 'Documentation' }
      ]
    },
    {
      id: 'mod_6',
      moduleNumber: 6,
      title: 'Object-Oriented Programming (OOP) in Python',
      level: 'Intermediate',
      durationWeeksOrHours: 'Week 6 (6 Hours)',
      overview: 'Class definition, constructor (__init__), instance vs class attributes, encapsulation, inheritance, method overriding, and Python special dunder methods.',
      learningOutcomes: [
        { outcome: 'Model domain entities as reusable classes with state and behavior', bloomsLevel: 'Create' },
        { outcome: 'Implement class inheritance hierarchies and leverage super() for code reuse', bloomsLevel: 'Apply' },
        { outcome: 'Implement dunder methods (__str__, __repr__, __len__) for idiomatic class behavior', bloomsLevel: 'Apply' }
      ],
      subtopics: [
        {
          id: 'sub_6_1',
          title: 'Classes, Objects & Attributes',
          description: 'The class keyword, __init__ constructor, the self parameter, instance variables vs class variables.',
          estimatedHours: 2,
          keyConcepts: ['Encapsulation', 'self binding', 'Class vs instance attributes'],
          teachingMethod: 'lecture'
        },
        {
          id: 'sub_6_2',
          title: 'Inheritance & Polymorphism',
          description: 'Base classes, derived subclasses, super() invocation, method overriding, and polymorphism in action.',
          estimatedHours: 2,
          keyConcepts: ['Subclassing', 'Method resolution order (MRO)', 'super() call'],
          teachingMethod: 'hands-on-coding'
        },
        {
          id: 'sub_6_3',
          title: 'Properties & Magic (Dunder) Methods',
          description: '@property getters/setters for data validation, __str__, __repr__, __eq__, and operator overloading.',
          estimatedHours: 2,
          keyConcepts: ['@property decorator', 'Dunder methods', 'Object representation'],
          teachingMethod: 'lab'
        }
      ],
      assessments: [
        {
          id: 'as_6_1',
          type: 'Assignment',
          title: 'Bank Account & Transaction Management System',
          description: 'Design a hierarchy of BankAccount, SavingsAccount, and CheckingAccount classes with balance checks, overdraft protection, and transaction histories.',
          weightPercentage: 15
        }
      ],
      resources: [
        { title: 'Fluent Python: Object-Oriented Idioms', type: 'Reading' }
      ]
    },
    {
      id: 'mod_7',
      moduleNumber: 7,
      title: 'File Handling, JSON & Exception Handling',
      level: 'Advanced',
      durationWeeksOrHours: 'Week 7 (6 Hours)',
      overview: 'Persistent data storage via text and CSV files, JSON serialization/deserialization, context managers (with open), and graceful error recovery using try/except/finally.',
      learningOutcomes: [
        { outcome: 'Safely read and write file streams using context managers to avoid resource leaks', bloomsLevel: 'Apply' },
        { outcome: 'Parse, serialize, and validate JSON payloads from local files or web services', bloomsLevel: 'Apply' },
        { outcome: 'Construct resilient error handling hierarchies with custom exception classes', bloomsLevel: 'Evaluate' }
      ],
      subtopics: [
        {
          id: 'sub_7_1',
          title: 'File I/O & Context Managers',
          description: 'Reading modes (r, w, a), cursor positioning, reading lines, and the with statement context manager.',
          estimatedHours: 2,
          keyConcepts: ['open() modes', 'Context manager protocol', 'Newline handling'],
          teachingMethod: 'lecture'
        },
        {
          id: 'sub_7_2',
          title: 'Working with CSV and JSON Data',
          description: 'The json module (dumps, loads, dump, load), csv.reader and csv.DictWriter for tabular data processing.',
          estimatedHours: 2,
          keyConcepts: ['JSON mapping to dicts', 'CSV serialization', 'Data persistence'],
          teachingMethod: 'hands-on-coding'
        },
        {
          id: 'sub_7_3',
          title: 'Robust Exception Handling',
          description: 'try, except, else, finally blocks, catching specific exception types, raising exceptions, and defining custom Exceptions.',
          estimatedHours: 2,
          keyConcepts: ['Exception hierarchy', 'try/except/finally flow', 'Custom exception classes'],
          teachingMethod: 'lab'
        }
      ],
      assessments: [
        {
          id: 'as_7_1',
          type: 'Lab Exercise',
          title: 'Expense Tracker with JSON File Persistence & Error Logging',
          description: 'Create an expense tracking tool that saves logs to JSON, alerts on corrupted records, and validates user inputs without crashing.',
          weightPercentage: 15
        }
      ],
      resources: [
        { title: 'Python Docs: Errors and Exceptions', type: 'Documentation' }
      ]
    },
    {
      id: 'mod_8',
      moduleNumber: 8,
      title: 'Capstone Mini-Project: Complete Python Application',
      level: 'Capstone',
      durationWeeksOrHours: 'Week 8 (6 Hours)',
      overview: 'Synthesizing all foundational and advanced Python concepts into a full-featured, modular console or desktop/web application with testing, documentation, and error handling.',
      learningOutcomes: [
        { outcome: 'Architect an end-to-end Python application from initial specification to completion', bloomsLevel: 'Create' },
        { outcome: 'Apply OOP principles, modular package structure, and persistent storage', bloomsLevel: 'Create' },
        { outcome: 'Document project code with docstrings, README, and unit tests', bloomsLevel: 'Evaluate' }
      ],
      subtopics: [
        {
          id: 'sub_8_1',
          title: 'Application Architecture & Requirements Analysis',
          description: 'Breaking down user stories, designing class diagrams, choosing file formats, and planning milestones.',
          estimatedHours: 2,
          keyConcepts: ['Software design', 'Architecture diagramming', 'Modular decomposition'],
          teachingMethod: 'case-study'
        },
        {
          id: 'sub_8_2',
          title: 'Implementation Sprint & Third-Party Library Integration',
          description: 'Writing core logic, integrating helper libraries (e.g. requests, rich), and error mitigation.',
          estimatedHours: 2,
          keyConcepts: ['External dependencies', 'Clean code execution', 'Integration testing'],
          teachingMethod: 'hands-on-coding'
        },
        {
          id: 'sub_8_3',
          title: 'Testing with pytest, Packaging & Final Demonstration',
          description: 'Writing unit tests with pytest or unittest, drafting user documentation, and presenting the final build.',
          estimatedHours: 2,
          keyConcepts: ['Unit testing', 'README documentation', 'Peer code review'],
          teachingMethod: 'workshop'
        }
      ],
      assessments: [
        {
          id: 'as_8_1',
          type: 'Milestone Project',
          title: 'Final Capstone Project Submission & Defense',
          description: 'Deliver the full application codebase, user manual, test suite with passing assertions, and a live demonstration.',
          weightPercentage: 30
        }
      ],
      resources: [
        { title: 'Python Packaging User Guide', type: 'Documentation' }
      ]
    }
  ],
  finalAssessment: {
    capstoneProjectTitle: 'Personal Productivity & Data Management System',
    capstoneDescription: 'Students develop an extensible, modular command-line or GUI application (e.g. Task & Habit Tracker, Inventory Management System, or Weather Dashboard with API integration). The system must employ OOP, persistent storage (JSON/SQLite), input validation, defensive exception handling, and automated unit tests.',
    deliverables: [
      'Modular Python source code organized in a package directory structure',
      'README.md containing installation steps, dependencies, and usage guide',
      'Comprehensive test suite using unittest or pytest with >75% branch coverage',
      'Sample data files and demonstrated handling of invalid input scenarios'
    ],
    evaluationCriteria: [
      'Architectural modularity and adherence to PEP 8 style standards (25%)',
      'Effective application of Object-Oriented Design principles (25%)',
      'Robust error handling and file/data persistence resilience (25%)',
      'Quality of automated tests and comprehensive documentation (25%)'
    ],
    finalExamOutline: [
      'Part 1: Conceptual Diagnostic (Multiple Choice & Code Output Tracing)',
      'Part 2: Debugging Challenge (Identifying logic flaws and memory leaks)',
      'Part 3: Live Coding Challenge (Implementing an algorithmic function with data collections)'
    ]
  }
};
