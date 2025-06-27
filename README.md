Entry … Programming, Apps & Robotics

Jun Jue Ang, Year 11

## Interactive Educational Website for SACE Stage 1 Maths

**What is this project?**

This project is an interactive educational website designed to help high school students to understand the concepts of Stage 1 Maths syllabus. The goal of this website is to implement ai to help tutoring the students of SACE with guidelines and content given in interactive, step by step way to assist and build a stronger understanding on the topic. 

**Pain of students and how to solve?**

As a currently high school students, I had been noticing students struggling on multiple subjects especially mathematic. Teachers are rushing through topics, which leave students behind, overwhelming and disengaged. This led to students required to spend lots of time self-studying after class and for students that could not manage to catch up would fail the subject and being drop down. Thus, the aim for the educational website is to assist student through maths in personalized and interactive study making it not a boring class while learning effectively. 

Purpose/Aim

## Research and Exploration

Tech Stack: UI/UX

- Html
- CSS
- JavaScript

These 3 languages are chosen for fast prototyping and are ideal for creating a web-based interface. They ensure quality while visualizing the website in well structured, allowing the demonstration of the potential of how the project will be. 

Ai tools

- Gemini 2.0 Flash

In this project, the ai integration will be using the Gemini api. Compare to GROQ Api which is free and faster Gemini 2.0 flash is free, fast and have access to tool. While ChatGPT have all function and smarter it is paid thus it can be implemented in the future for enhancement but not now. 

Graphing

Desmos

- Simple, fast visualization of **quadratics and transformations**
- Smooth **slider interaction** for a,b,ca, b, ca,b,c in ax2+bx+cax^2 + bx + cax2+bx+c
- Clean tool for **student use and engagement** in class
- A **gentle intro** to graphing for Stage 1 or General Math's

GeoGebra

- **All-in-one tool** for graphs, algebra, statistics, and geometry
- To go **beyond quadratics** (e.g. calculus, vector proofs, 3D)
- **Deeper exploration** in Specialist Mathematics
- Offline or exam-compatible access

So, for simplicity and MVP, demos is a better choice for clean, simple and nice implement.

## MathJax vs KaTeX

| Feature | MathJax | KaTeX |
| --- | --- | --- |
| **Rendering Speed** | Slower; renders math after page load, causes delay or flicker | Extremely fast; renders math instantly without flicker |
| **File Size** | Large (~2MB+), can slow page load | Lightweight (~300KB), loads quickly |
| **LaTeX Coverage** | Very comprehensive; supports almost all LaTeX commands, environments, packages | Good but partial; supports common math but not complex or niche packages |
| **Ease of Setup** | Easy, but heavier scripts to include | Very easy and lightweight to add |
| **Performance on Mobile** | Can lag or be slow, especially on low-end devices | Smooth and fast, better for mobile users |
| **Customization & Extensions** | Highly customizable with plugins and extensions | More limited, but sufficient for most educational needs |
| **Community & Usage** | Widely used in academia, research papers, journals | Used by Khan Academy, Coursera, many edu platforms |

KaTex has a better speed, simple lightweight for web used, and proven in education by site like khan academy, so it is a better idea to be used.

I have tested the MathJax and KaTeX to figure which works better and it appear that KaTeX has a better result with its customization, simplicity of use, speed of rendering and arrangement. 

![image.png](attachment:f786fd81-6913-4524-a256-fc271423661d:image.png)

## Planning and Designing

Flow overview:

Input (curriculum + preferences) → Guideline → Checklist → Task → Session

Normally, if students ask AI questions and for explanation it just dump everything in a message. This led to overwhelming and confusing since there is too much information within the message. So instead of that I introduced the concept of the “Session Flow” which allow AI to teach step by step, checking students understanding before continuing and adjusts response and teaching style based on students’ behavior and response. 

This is the example of how it would look like that teaching step by step and checking for the understanding. With the introduction of this method, it helps to prevent overload of information, creating a personalized tutoring experiences to the student with more natural and responsive. 

![image.png](attachment:c025c229-49d0-45a1-91cf-126be1cddef9:image.png)

This tutoring method is refined from previous which without checklist. However, I noticed that with only task given AI often changed the syllabus and content to teach which either skipping important parts or oversimplifying content to teach. Thus, by introducing the checklist method with keywords and concepts to teach it not only allow AI to follow a structured teaching path, but it is also flexible and adapt to students’ behavior well. 

## Process of Development

The core of this project follows this structure flow:

> **Input (curriculum + preferences)** → **Study Guideline** → **Checklist** → **Task** → **Session** → **Student Response** → **Confidence Check** → **Feedback**
> 

**Purpose**: To provide an interactive, constant and effective way for student to understand a topic

**What**: A prescript guideline will be provided to AI + checklist to ensure a constant learning output to every student, so they learn exactly same thing. 

**Why**: To ensure by providing different preferences and analyzing students’ response it will provide a personalized learning study with fixed guideline given. And also, providing and interactive study session

**How**: Create a well-structured checklist for a subtopic within a topic (Quadratics, Introduction) with learning goal

Session flow more like a checklist which if one task done it will move onwards, Ai will analyze if student understand, able to explain the concepts, identify strongly and confident to move to next step.

After every session done, ai summarize what students had learned and provide feedback to them.

**Basic Flow:**

1. Start session → Display 1st checklist item
2. AI explains task (with emoji, math formatting, fun style)
3. Student responds → Confidence Check
4. AI evaluates → Moves to next OR gives retry support
5. Final feedback + emoji stars + summary

Example of checklist in JSON format:

Step, title, goal, concept, keywords, example

Each checklist will be presented as a structured object like this

```jsx
const checklist = [
        {
          step: 1,
          title: "Identifying Coefficients",
          goal: "Student can identify the values of a, b, and c in a quadratic equation.",
          concept: "Coefficients in standard form: $ax^2 + bx + c = 0$",
          keywords: ["coefficient", "a", "b", "c", "quadratic equation"],
          example: "$2x^2 + 3x - 5 = 0$",
        },
        {
          step: 2,
          title: "Graph Shape Based on Coefficient a",
          goal: "Student understands how the value of a affects the parabola's direction and width.",
          concept:
            "The sign and magnitude of 'a' affect whether the parabola opens up/down and how wide/narrow it is.",
          keywords: ["graph", "a", "parabola", "open up", "open down"],
          example: "$y = 2x^2$ vs $y = -0.5x^2$",
        },
      ];
```

Prompt

```jsx
const prompt = `
      You are a patient and friendly human tutor. You are a tutor that teaches slowly and step-by-step. In each response, do only one thing: either explain, give an example, or ask a question — not all at once.

      🎯 Topic: ${sessionData.topic}
      📌 Goal: ${sessionData.learningGoal}

      You're now teaching step ${step.step}: **${step.title}**

      Teaching focus:
      - 🎯 Step Goal: ${step.goal}
      - 📚 Concept: ${step.concept}
      - 🧠 Keywords: ${step.keywords.join(", ")}
      - ✍️ Example: ${step.example}

Session Rules:
- Only do ONE small teaching move per turn:
    - Either explain a concept,
    - OR give an example,
    - OR ask a question.
- NEVER combine explanation + example + question in a single turn.
- Be encouraging and use emojis + LaTeX.
- Wait for the student to respond before continuing.
- Do NOT include the token NEXT_STEP until the student has shown full understanding over 2–3 turns.
- When you do use NEXT_STEP, put it at the end of your message, and only if the current step is clearly mastered.
- At the final step, end the session with the code 3$%6&.

      Here is the conversation so far:
      ${history}

      Now generate the next teaching turn for step ${step.step}.
      `;
```

Checking for NEXT_STEP

```jsx
if (aiText.includes("NEXT_STEP")) {
            console.log("📍 NEXT_STEP detected — triggering confidence check");
            showConfidenceCheck();
            return; // Wait for confidence input before proceeding
          }
```

Server for sending ai to 

```jsx
app.post("/session-teach", async (req, res) => {
  const userText = req.body.prompt;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: userText }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      },
    );
```

Dark screen has a better UI and positive feedback while white screen works well but it feels tired and boring after few minutes of used.

![image.png](attachment:897813b8-82ca-4a39-872b-0cfb3a5e5bee:image.png)

![image.png](attachment:c781201a-b829-473f-afe2-74fd36fa635d:image.png)

## Challenges and Solutions

After testing the prompt and checklist it works out well. It has showed highly effectiveness to teach and building confidence and also teaching in interactive style. However total token of **44318** is used which is 9x as expected! The teaching style works well for maybe smaller age group but may be oversimplified for year 11 while depth of learning is to surface and should dive in more. 

Trial one:

integrating a reuseable system prompt for static instructions

```
You are a patient and encouraging human tutor who teaches step-by-step using interactive dialogue. 

Your style:
- Use one clear teaching move per response (explain OR example OR ask a question).
- Be concise, kind, and focused.
- Avoid combining explanation + example + question in one message.
- Use minimal markdown and Notion-style formatting (explained below).

Formatting guide:
- **Bold** = important ideas  
- *Italic* = emphasis  
- ==Highlight== = key terms  
- `inline code` = math or formulas  

Callout blocks:
- [!tip] = Helpful hints  
- [!important] = Critical idea  
- [!warning] = Common mistake  
- > Blockquote = definitions  

Rules:
- Wait for the student’s response before continuing.
- Never rush. Keep the pace slow and thoughtful.
- Only say `NEXT_STEP` if the student has shown strong understanding over at least 2–3 turns.
```

and for dynamic prompt (sent per turn)

```
🎯 Topic: ${sessionData.topic}
🧠 Learning Goal: ${sessionData.learningGoal}

You are now teaching:

Step ${step.step}: **${step.title}**
- Goal: ${step.goal}
- Concept: ${step.concept}
- Keywords: ${step.keywords.join(", ")}
- Example: ${step.example}

[Optional additions, if you include these in checklist:]
- Difficulty: ${step.difficulty || "beginner"}
- Common mistakes to avoid: ${step.commonMistakes?.join("; ") || "None listed"}
- Test: ${step.test || ""}

Conversation so far:
${history}

Continue with the next teaching message for **step ${step.step}**.

⚠️ Remember:
- Do ONE thing only: explain, give example, OR ask a question.
- Do NOT give `NEXT_STEP` yet unless student has clearly demonstrated mastery.
- Be warm and supportive.
```

### **Feedback from Peers and Improvements Made**

During early testing, I gathered some feedback from friends for trying out the prototype. Some key points gathered:

- More interactive than ChatGPT
- Suggested adding buttons for multiple questions to make a smoother and interactive experience
- Recommended including features that ChatGPT doesn’t have to stand out
- Gamify style isn’t preferred for him, serious tone and playful is enough.

In response to the feedback, I implemented clickable button which AI can generated Json with content to build a multiple-choice question function. AI can decide when to use and according to student’s preferences to adjust how often it is needed. 

![image.png](attachment:4e26450a-41e1-4cbe-b310-8bae1e8cd6a4:image.png)

### **Improving JSON Parsing for Multiple Choice Questions**

During development, I encountered an issue which the multiple-choice data is included in the message. This showed that the Json isn’t being extracted and cleaned properly which cause the left-over showed in figure 2.

The original parseMultipleChoice() function searched for the JSON objects directly in the text. While it does work in simple cases, it often struggles handling to clean extract JSON when wrapped inside markdown code blocks (e.g. `json` ), resulting in unclean text being shown to students.

```jsx
function parseMultipleChoice(text) {
        const jsonRegex = /\{[\s\S]*?"type":\s*"multiple_choice"[\s\S]*?\}/g;
        const matches = text.match(jsonRegex);

        if (!matches) return { cleanText: text, mcQuestions: [] };

        let cleanText = text;
        const mcQuestions = [];

        matches.forEach((match) => {
          try {
            const mcData = JSON.parse(match);
            if (mcData.type === "multiple_choice") {
              mcQuestions.push(mcData);
              cleanText = cleanText.replace(match, "").trim();
            }
          } catch (e) {
            console.error("Error parsing multiple choice JSON:", e);
          }
        });

        return { cleanText, mcQuestions };
      }
```

![Figure 2: *Raw JSON being displayed in the UI due to incomplete cleaning.*](attachment:dc19d05f-0823-4242-86f8-06df7d7dc763:image.png)

Figure 2: *Raw JSON being displayed in the UI due to incomplete cleaning.*

Thus, to improve I updated the function to first identify the Json and then fall back to detect raw Json.  With this updated method it detected both ``` json ``` and `` json ``, parsing and removing the Json safely. 

```jsx
// Updated parseMultipleChoice function to handle markdown code blocks
function parseMultipleChoice(text) {
  // First, extract JSON from markdown code blocks (```json or `json)
  const codeBlockRegex = /```json\s*([\s\S]*?)\s*```|`json\s*([\s\S]*?)\s*`/g;
  let cleanText = text;
  const mcQuestions = [];
  
  // Find all code blocks with json
  let match;
  while ((match = codeBlockRegex.exec(text)) !== null) {
    const jsonString = match[1] || match[2]; // Get the captured JSON content
    
    try {
      const mcData = JSON.parse(jsonString.trim());
      if (mcData.type === "multiple_choice") {
        mcQuestions.push(mcData);
        // Remove the entire code block from the text
        cleanText = cleanText.replace(match[0], "").trim();
      }
    } catch (e) {
      console.error("Error parsing multiple choice JSON from code block:", e);
    }
  }
  
  // Also check for direct JSON (without code blocks) as fallback
  if (mcQuestions.length === 0) {
    const directJsonRegex = /\{[\s\S]*?"type":\s*"multiple_choice"[\s\S]*?\}/g;
    const directMatches = cleanText.match(directJsonRegex);
    
    if (directMatches) {
      directMatches.forEach(jsonMatch => {
        try {
          const mcData = JSON.parse(jsonMatch);
          if (mcData.type === "multiple_choice") {
            mcQuestions.push(mcData);
            cleanText = cleanText.replace(jsonMatch, "").trim();
          }
        } catch (e) {
          console.error("Error parsing direct multiple choice JSON:", e);
        }
      });
    }
  }
  
  // Clean up any remaining empty code blocks or stray backticks
  cleanText = cleanText
    .replace(/```json\s*```/g, "") // Remove empty json code blocks
    .replace(/`json\s*`/g, "") // Remove empty json inline code
    .replace(/```\s*```/g, "") // Remove any other empty code blocks
    .replace(/\n\s*\n\s*\n/g, "\n\n") // Clean up multiple empty lines
    .trim();
  
  return { cleanText, mcQuestions };
}
```

![image.png](attachment:e2bb769f-70e9-413b-8d43-7d57453d16fb:image.png)

## Final Outcome

The final outcome of this product is an interactive functional website prototype focusing on teaching SACE Stage 1 Math's through an interactive and personalized flow. 

Key Outcomes:

- Developed a session using Gemini Flash to teach step by step with checklist tracking
- Integrated LaTeX, Ui buttons and Json based multiple questions
- System that uses teaching step to teach step by step like a human tutor and adjust based on students’ confidence and progress.
- Fixing issues like Json parsing

This prototype demonstrates that AI can be used as an effective learning tool, even currently at the first MVP stage it already showed a high potential to assist and support students in a fun and interactive way, adapting to their behaviors and needs. 

## Evaluation

## Conclusion

In conclusion, this project explored the integration of Ai in education through interactive web app. It has showed the potential to solve real classroom problems such as fast pacing, confusing teaching, and lack of support. It proofs that AI isn’t just a chatbot it can also be a study companion. For the future growth, more functions and website will be concluded and added, aiming for a fully working educational website which can provide high school students in Australia a better learning environment. 

## References

https://ai.google.dev/gemini-api/docs/text-generation

https://katex.org/docs/api

https://www.mathjax.org/

https://www.desmos.com/calculator

https://www.khanacademy.org/
