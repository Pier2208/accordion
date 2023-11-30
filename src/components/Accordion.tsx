import { ChevronDown } from 'lucide-react';
import { createContext, useContext, useState } from 'react';

interface AccordionContextType {
  openIds: number[];
  toggle: (id: number) => void;
  isOpen: (id: number) => boolean;
}

const AccordionContext = createContext<AccordionContextType>({
  openIds: [],
  toggle: () => {},
  isOpen: (id) => (id ? true : false),
});

function Accordion({ children }: { children: React.ReactNode }) {
  const [openIds, setOpenIds] = useState<number[]>([]);

  const toggle = (id: number) => {
    const el = openIds.find((item) => item === id);
    if (el) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds((prev) => [...prev, id]);
    }
  };

  const isOpen = (id: number) => {
    return openIds.includes(id) ? true : false;
  };

  return (
    <AccordionContext.Provider value={{ openIds, toggle, isOpen }}>
      <div className="flex flex-col w-full">{children}</div>
    </AccordionContext.Provider>
  );
}

Accordion.Title = function Title({ children }: { children: React.ReactNode }) {
  return <h1 className="text-xl text-center mb-6">{children}</h1>;
};

Accordion.Body = function Body({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-y-2">{children}</div>;
};

Accordion.Item = function Item({ id, children }: { id: number; children: React.ReactNode }) {
  const { toggle } = useContext(AccordionContext);
  return (
    <article onClick={() => toggle(id)} className="w-full bg-slate-600 text-white text-center rounded">
      {children}
    </article>
  );
};

Accordion.Header = function Header({ id, children }: { id: number; children: React.ReactNode }) {
  const { isOpen } = useContext(AccordionContext);

  return (
    <div className="py-2 cursor-pointer relative">
      {children}
      <ChevronDown
        className={`absolute my-auto top-0 bottom-0 right-0 transition-transform ease-in-out duration-500 ${
          isOpen(id) && 'transform rotate-180'
        }`}
      />
    </div>
  );
};

Accordion.Content = function Content({ id, children }: { id: number; children: React.ReactNode }) {
  const { isOpen } = useContext(AccordionContext);

  return (
    <div
      className={`bg-slate-100 text-black px-2 overflow-hidden transition-all ease-in-out duration-500 ${
        isOpen(id) ? 'max-h-60 py-4' : 'max-h-0 p-0'
      }`}
    >
      {children}
    </div>
  );
};

export default Accordion;
