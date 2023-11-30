import Accordion from './components/Accordion';
import faqData from './data/faq.json';

function App() {
  return (
    <main className="w-full min-h-screen flex justify-center bg-slate-200 p-8">
      <div className="w-1/3">
        <Accordion>
          <Accordion.Title>Frequently Asked Questions</Accordion.Title>
          <Accordion.Body>
            {faqData.map((item) => (
              <Accordion.Item key={item.id} id={item.id}>
                <Accordion.Header>{item.header}</Accordion.Header>
                <Accordion.Content>{item.body}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Body>
        </Accordion>
      </div>
    </main>
  );
}

export default App;
