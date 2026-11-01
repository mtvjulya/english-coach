import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './screens/Home';
import Placement from './screens/Placement';
import GrammarTopics from './screens/grammar/Topics';
import TopicHub from './screens/grammar/Hub';
import Theory from './screens/grammar/Theory';
import Practice from './screens/grammar/Practice';
import TranslationStage from './screens/grammar/TranslationStage';
import VocabThemes from './screens/vocab/Themes';
import ThemeHub from './screens/vocab/Hub';
import Flashcards from './screens/vocab/Cards';
import VocabPractice from './screens/vocab/Practice';
import Review from './screens/vocab/Review';
import ActiveUse from './screens/vocab/Active';
import Scenarios from './screens/speaking/Scenarios';
import Dialogue from './screens/speaking/Dialogue';
import SentencesHub from './screens/sentences/Hub';
import SentenceLesson from './screens/sentences/Lesson';
import DialogueLibrary from './screens/dialogues/Library';
import DialogueReader from './screens/dialogues/Reader';
import Mistakes from './screens/Mistakes';
import Settings from './screens/Settings';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/placement" element={<Placement />} />
        <Route path="/grammar" element={<GrammarTopics />} />
        <Route path="/grammar/:topicId" element={<TopicHub />} />
        <Route path="/grammar/:topicId/theory" element={<Theory />} />
        <Route path="/grammar/:topicId/practice" element={<Practice />} />
        <Route path="/grammar/:topicId/translation" element={<TranslationStage />} />
        <Route path="/vocab" element={<VocabThemes />} />
        <Route path="/vocab/review" element={<Review />} />
        <Route path="/vocab/:themeId" element={<ThemeHub />} />
        <Route path="/vocab/:themeId/cards" element={<Flashcards />} />
        <Route path="/vocab/:themeId/practice" element={<VocabPractice />} />
        <Route path="/vocab/:themeId/active" element={<ActiveUse />} />
        <Route path="/speaking" element={<Scenarios />} />
        <Route path="/speaking/:scenarioId" element={<Dialogue />} />
        <Route path="/sentences" element={<SentencesHub />} />
        <Route path="/sentences/:packId" element={<SentenceLesson />} />
        <Route path="/dialogues" element={<DialogueLibrary />} />
        <Route path="/dialogues/:dialogueId" element={<DialogueReader />} />
        <Route path="/mistakes" element={<Mistakes />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}
