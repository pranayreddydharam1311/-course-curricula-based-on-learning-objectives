import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { 
  generateCurriculumFromAI, 
  expandModuleLessonPlan, 
  generateModuleQuizAI, 
  generateAssignmentRubricAI 
} from './src/server/geminiService.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Parse JSON payloads with generous limit
  app.use(express.json({ limit: '10mb' }));

  // CORS headers
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', hasGeminiKey: !!process.env.GEMINI_API_KEY });
  });

  // Generate curriculum
  app.post('/api/generate-curriculum', async (req, res) => {
    try {
      const { 
        learningObjectives, 
        courseTitle, 
        targetAudience, 
        duration, 
        weeklyHours, 
        deliveryFormat, 
        prerequisites, 
        industryAlignment,
        focusTone
      } = req.body;

      if (!learningObjectives || !learningObjectives.trim()) {
        return res.status(400).json({ error: 'Learning objectives are required.' });
      }

      const curriculum = await generateCurriculumFromAI({
        learningObjectives,
        courseTitle,
        targetAudience,
        duration,
        weeklyHours: Number(weeklyHours) || 5,
        deliveryFormat,
        prerequisites,
        industryAlignment,
        focusTone,
      });

      return res.json({ success: true, curriculum });
    } catch (error: any) {
      console.error('Error generating curriculum:', error);
      return res.status(500).json({ 
        error: error.message || 'Failed to generate curriculum. Please try again.' 
      });
    }
  });

  // Expand module lesson plan
  app.post('/api/expand-module', async (req, res) => {
    try {
      const { module, courseTitle } = req.body;
      if (!module) {
        return res.status(400).json({ error: 'Module data is required.' });
      }

      const lessonPlan = await expandModuleLessonPlan(module, courseTitle || 'Course');
      return res.json({ success: true, lessonPlan });
    } catch (error: any) {
      console.error('Error expanding module:', error);
      return res.status(500).json({ error: error.message || 'Failed to expand module lesson plan.' });
    }
  });

  // Generate module quiz
  app.post('/api/generate-quiz', async (req, res) => {
    try {
      const { module, courseTitle } = req.body;
      if (!module) {
        return res.status(400).json({ error: 'Module data is required.' });
      }

      const quiz = await generateModuleQuizAI(module, courseTitle || 'Course');
      return res.json({ success: true, quiz });
    } catch (error: any) {
      console.error('Error generating quiz:', error);
      return res.status(500).json({ error: error.message || 'Failed to generate quiz.' });
    }
  });

  // Generate assignment & rubric
  app.post('/api/generate-assignment', async (req, res) => {
    try {
      const { module, courseTitle } = req.body;
      if (!module) {
        return res.status(400).json({ error: 'Module data is required.' });
      }

      const assignment = await generateAssignmentRubricAI(module, courseTitle || 'Course');
      return res.json({ success: true, assignment });
    } catch (error: any) {
      console.error('Error generating assignment:', error);
      return res.status(500).json({ error: error.message || 'Failed to generate assignment rubric.' });
    }
  });

  // Mount Vite middleware in development mode or serve static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
