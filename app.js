/* Book Talk — a personal, offline reading-habit tracker.
   Everything lives in localStorage. No API, no network calls, no cost. */

const STORAGE_KEY = 'bookTalkData_v2';

const QUOTES = [
  { text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.", author: "George R.R. Martin" },
  { text: "Once you learn to read, you will be forever free.", author: "Frederick Douglass" },
  { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
  { text: "The reading of all good books is like a conversation with the finest minds of past centuries.", author: "René Descartes" },
  { text: "We read to know we are not alone.", author: "C.S. Lewis" },
  { text: "Until I feared I would lose it, I never loved to read. One does not love breathing.", author: "Harper Lee" },
  { text: "A book is a dream that you hold in your hand.", author: "Neil Gaiman" },
  { text: "I do believe something very magical can happen when you read a good book.", author: "J.K. Rowling" },
  { text: "That is part of the beauty of all literature. You discover that your longings are universal longings.", author: "F. Scott Fitzgerald" },
  { text: "Reading is essential for those who seek to rise above the ordinary.", author: "Jim Rohn" },
  { text: "Today a reader, tomorrow a leader.", author: "Margaret Fuller" },
  { text: "If you only read the books that everyone else is reading, you can only think what everyone else is thinking.", author: "Haruki Murakami" },
  { text: "The world was hers for the reading.", author: "Betty Smith" },
  { text: "Reading gives us someplace to go when we have to stay where we are.", author: "Mason Cooley" },
  { text: "It is what you read when you don't have to that determines what you will be when you can't help it.", author: "Oscar Wilde" },
];

const TAG_LABELS = {
  short: 'Short & fast',
  comfort: 'Comfort read',
  unputdownable: 'Un-put-downable',
  classic: 'Modern classic',
  thriller: 'Thriller',
  scifi: 'Sci-fi',
  memoir: 'Memoir',
};

const STARTER_BOOKS = [
  { title: 'The Alchemist', author: 'Paulo Coelho', tags: ['comfort', 'short'] },
  { title: 'The Old Man and the Sea', author: 'Ernest Hemingway', tags: ['short', 'classic'] },
  { title: 'Fahrenheit 451', author: 'Ray Bradbury', tags: ['short', 'classic'] },
  { title: 'The Giver', author: 'Lois Lowry', tags: ['short'] },
  { title: 'Of Mice and Men', author: 'John Steinbeck', tags: ['short', 'classic'] },
  { title: 'The Curious Incident of the Dog in the Night-Time', author: 'Mark Haddon', tags: ['unputdownable'] },
  { title: 'Where the Crawdads Sing', author: 'Delia Owens', tags: ['unputdownable'] },
  { title: 'The Silent Patient', author: 'Alex Michaelides', tags: ['unputdownable', 'thriller'] },
  { title: 'Circe', author: 'Madeline Miller', tags: ['classic', 'comfort'] },
  { title: 'The House in the Cerulean Sea', author: 'TJ Klune', tags: ['comfort'] },
  { title: 'Project Hail Mary', author: 'Andy Weir', tags: ['unputdownable', 'scifi'] },
  { title: 'Klara and the Sun', author: 'Kazuo Ishiguro', tags: ['classic', 'scifi'] },
  { title: 'A Man Called Ove', author: 'Fredrik Backman', tags: ['comfort'] },
  { title: 'The Kite Runner', author: 'Khaled Hosseini', tags: ['classic'] },
  { title: 'Educated', author: 'Tara Westover', tags: ['unputdownable', 'memoir'] },
  { title: 'Norwegian Wood', author: 'Haruki Murakami', tags: ['classic'] },
];

const GLOSSARY_TERMS = [
  { term: 'Existentialism', definition: 'A philosophical movement holding that individuals create their own meaning in an inherently meaningless universe, emphasizing freedom, choice, and personal responsibility.' },
  { term: 'The Absurd', definition: "The conflict between humans' search for inherent meaning and the universe's silence or indifference — central to Camus's philosophy." },
  { term: 'Categorical Imperative', definition: "Kant's principle that you should act only according to rules you'd want to become universal laws for everyone, regardless of the outcome." },
  { term: 'Nihilism', definition: 'The belief that life has no inherent meaning, value, or purpose.' },
  { term: 'Stoicism', definition: 'An ancient philosophy teaching that virtue and inner peace come from accepting what you cannot control and focusing only on your own judgments and actions.' },
  { term: 'Utilitarianism', definition: 'The ethical theory that the right action is the one that produces the greatest good (happiness) for the greatest number of people.' },
  { term: 'Empiricism', definition: 'The view that knowledge comes primarily from sensory experience rather than reason alone.' },
  { term: 'Rationalism', definition: 'The view that reason, rather than experience, is the primary source of knowledge.' },
  { term: 'Phenomenology', definition: 'The philosophical study of the structures of experience and consciousness, focused on how things appear to us.' },
  { term: 'Dialectic', definition: 'A method of reasoning that resolves contradictions by finding a synthesis between a thesis and its opposing antithesis.' },
  { term: 'Epistemology', definition: 'The branch of philosophy concerned with the nature, sources, and limits of knowledge.' },
  { term: 'Metaphysics', definition: 'The branch of philosophy dealing with the fundamental nature of reality, existence, and being.' },
  { term: 'Determinism', definition: 'The idea that all events, including human choices, are ultimately caused by prior events, leaving no room for true free will.' },
  { term: 'Free Will', definition: 'The capacity to choose and act independently of prior causes or fate.' },
  { term: 'A Priori', definition: 'Knowledge or reasoning that comes independent of experience — for example, "2 + 2 = 4."' },
  { term: 'A Posteriori', definition: 'Knowledge that comes from, or is justified by, experience or observation.' },
  { term: 'Solipsism', definition: "The idea that only one's own mind is sure to exist, and everything else might be uncertain or unreal." },
  { term: 'Dualism', definition: 'The view that mind and body (or matter and spirit) are fundamentally distinct kinds of substance.' },
  { term: 'Monism', definition: 'The view that reality is fundamentally one unified kind of thing, not split into separate categories like mind and matter.' },
  { term: 'Existential Angst', definition: "A deep anxiety that arises from confronting freedom, choice, and the responsibility of creating one's own meaning." },
  { term: 'Bad Faith (Sartre)', definition: 'The act of denying your own freedom by pretending your choices are forced by circumstance, roles, or other people.' },
  { term: 'The Übermensch (Nietzsche)', definition: "Nietzsche's concept of a person who creates their own values rather than adopting society's inherited morals." },
  { term: 'Will to Power (Nietzsche)', definition: "Nietzsche's idea that the fundamental driving force in humans is a striving for growth, dominance, and self-overcoming — not just survival." },
  { term: 'Social Contract', definition: "The idea that people's moral and political obligations depend on an implicit agreement among them to form the society they live in." },
  { term: 'Hypothetical Imperative', definition: 'A rule that applies only if you want a certain outcome — e.g. "don\'t lie if you want to be trusted" — unlike a categorical imperative, which applies unconditionally.' },
  { term: 'Bildungsroman', definition: "A novel focused on the psychological and moral growth of its protagonist from youth to adulthood." },
  { term: 'Stream of Consciousness', definition: "A narrative technique that tries to capture the continuous, unfiltered flow of a character's thoughts and feelings." },
  { term: 'Unreliable Narrator', definition: "A narrator whose credibility is compromised, making the reader question how much of the story to trust." },
  { term: 'Foil', definition: "A character whose traits contrast with another character's, highlighting particular qualities of the other by contrast." },
  { term: 'Motif', definition: "A recurring element, image, or idea that helps develop a story's central theme." },
  { term: 'Allegory', definition: 'A story in which characters and events symbolically represent broader ideas, morals, or historical events.' },
  { term: 'Existential Novel', definition: 'A novel exploring themes of individual existence, freedom, choice, and the search for meaning — often associated with Camus, Sartre, and Dostoevsky.' },
  { term: 'Epistolary Novel', definition: 'A novel told through a series of documents, usually letters, diary entries, or other correspondence.' },
  { term: 'Frame Narrative', definition: 'A story structured as a "story within a story," where an outer narrative sets up and contains an inner one.' },
  { term: 'In Medias Res', definition: 'A narrative technique that begins the story in the middle of the action, rather than at the beginning.' },
  { term: 'Deus Ex Machina', definition: 'An unexpected, often implausible plot device or character introduced suddenly to resolve a conflict.' },
  { term: 'Tragic Hero', definition: 'A protagonist with admirable qualities whose own flaw leads to their downfall.' },
  { term: 'Hamartia', definition: "A fatal flaw or error in judgment that leads to a tragic hero's downfall." },
  { term: 'Dramatic Irony', definition: "A gap between expectation and reality where the audience knows something the characters don't." },
  { term: 'Situational Irony', definition: 'A gap between expectation and reality where an outcome is the opposite of what was expected.' },
  { term: 'Symbolism', definition: 'The use of objects, characters, or events to represent deeper ideas or qualities beyond their literal meaning.' },
];

/* Generic reflection prompts — used when a book has no theme tags yet.
   'any' applies whether you're mid-book or done; 'reading' / 'finished' are stage-specific. */
const QUESTION_BANK = [
  { text: "Which character's decisions frustrated or confused you the most? What do you think was driving them?", stage: 'any' },
  { text: 'Describe one specific scene that has stuck with you. Why do you think it stayed?', stage: 'any' },
  { text: 'Has this book changed how you see a person, situation, or idea in your own life? If so, how?', stage: 'any' },
  { text: "What's a sentence or passage from this book you'd want to remember? Why that one?", stage: 'any' },
  { text: 'Did your opinion of any character shift as you read? What changed it?', stage: 'any' },
  { text: 'What assumption or belief did this book challenge, confirm, or complicate for you?', stage: 'any' },
  { text: 'Is there a decision a character made that you would have made differently? What would you have done instead?', stage: 'any' },
  { text: 'What emotion is this book leaving you with right now, and what specifically caused it?', stage: 'any' },
  { text: "What's something this book made you want to learn more about, or look up?", stage: 'any' },
  { text: 'If you could ask the author one question about this book, what would it be?', stage: 'any' },
  { text: "What's a question you have that the book hasn't answered yet?", stage: 'reading' },
  { text: 'Where do you think the story is headed from here? What are you hoping happens?', stage: 'reading' },
  { text: "What's kept you turning the pages so far — or what's making it hard to keep going?", stage: 'reading' },
  { text: "Is there a character you're rooting for right now? Why them specifically?", stage: 'reading' },
  { text: "What's surprised you the most so far?", stage: 'reading' },
  { text: 'How did the ending compare to what you expected going in?', stage: 'finished' },
  { text: 'What do you think this book was really about, underneath its plot?', stage: 'finished' },
  { text: 'Would you recommend this to someone specific in your life? Who, and why them?', stage: 'finished' },
  { text: "What would you tell someone who's about to start this book, without spoiling it?", stage: 'finished' },
  { text: "Looking back, is there a moment you'd rewrite if you were the author?", stage: 'finished' },
  { text: 'Now that you have finished it, does the title make more sense to you? How?', stage: 'finished' },
  { text: 'What will you remember about this book a year from now?', stage: 'finished' },
].map((q, i) => ({ id: `g${i}`, ...q }));

/* Theme-tagged prompts — you tag a book with the themes it actually deals with,
   and questions get pulled from those pools instead of the generic bank. Each
   theme's list is ordered shallow → personal, so as you answer more you're
   naturally walked toward more introspective ground (not literally reading your
   answers — see the conversation that led here — but a real progression). */
const THEME_LABELS = {
  loneliness: 'Loneliness & isolation',
  longing: 'Longing & unfulfilled love',
  grief: 'Grief & loss',
  identity: 'Identity',
  guilt: 'Guilt & redemption',
  betrayal: 'Betrayal',
  comingofage: 'Coming of age',
  foundfamily: 'Found family & belonging',
  power: 'Power & corruption',
  justice: 'Justice & injustice',
  moralambiguity: 'Moral ambiguity',
  obsession: 'Obsession',
  memory: 'Memory & nostalgia',
  fear: 'Fear & anxiety',
  freedom: 'Freedom & confinement',
  mortality: 'Mortality',
  ambition: 'Ambition',
  forgiveness: 'Forgiveness',
  resilience: 'Resilience',
  class: 'Class & inequality',
  hope: 'Hope',
  jealousy: 'Jealousy & envy',
  sacrifice: 'Sacrifice',
  transformation: 'Transformation & change',
  escapism: 'Escapism',
  duty: 'Duty & obligation',
  secrets: 'Secrets',
  lostinnocence: 'Loss of innocence',
  displacement: 'Home & displacement',
  faith: 'Faith & doubt',
  trauma: 'Trauma',
  addiction: 'Addiction',
  parenthood: 'Parenthood',
  friendship: 'Friendship',
  revenge: 'Revenge',
};

const THEME_QUESTIONS_RAW = {
  loneliness: [
    "Was there a moment the main character's loneliness felt close to something you've actually felt? What was happening?",
    'Did the loneliness in this book feel chosen, or forced on the character by circumstance?',
    'Is there a scene where the character could have reached out to someone and didn’t? Why do you think they held back?',
    'What does this character do to cope with being alone — and does it actually help, or just numb it?',
    'If you could sit with this character for five minutes, what would you want to ask them?',
  ],
  longing: [
    'What is the character actually longing for — is it the person, or something the person represents?',
    'Is there a moment the longing gets what it wants, even briefly? What happens right after?',
    'Do you think the object of their longing would live up to it, if they actually got it?',
    'Whose longing in this book did you find more convincing, and whose felt self-deceiving?',
    'Has a line about longing in this book ever matched something you’ve felt but couldn’t word yourself?',
  ],
  grief: [
    'What does this character do in the moment grief actually hits — perform it, suppress it, or let it show?',
    'Is there a specific object, place, or ritual that becomes a stand-in for what was lost?',
    'Did the book let the grief resolve, or does it stay open-ended? Which did you want?',
    'Whose grief in the story got the least attention, and what do you think that says?',
    'Is there a moment of grief in this book that reminded you of your own, even indirectly?',
  ],
  identity: [
    'At what point does the character seem most unsure of who they are? What triggers it?',
    'Is there a version of themselves this character is trying to escape, or trying to become?',
    'Does anyone else in the book see the character more clearly than they see themselves?',
    'What’s one label or role placed on this character that they never fully accept?',
    'By the end, do you think the character actually changed, or just understood themselves better?',
  ],
  guilt: [
    'What is the character actually guilty of — and is it what they think they’re guilty of?',
    'Does the story let the character earn forgiveness, or withhold it? How did that land for you?',
    'Is there a moment the character almost confesses and doesn’t? What stops them?',
    'Who does the character’s guilt actually protect — themselves, or someone else?',
    'Do you think the consequences they faced fit what they actually did?',
  ],
  betrayal: [
    'Who do you think was actually betrayed the most in this book, even if the plot doesn’t center on them?',
    'Was the betrayal planned, or did it happen almost by accident? Does that change how you judge it?',
    'Is there a moment right before the betrayal where it still could have gone differently?',
    'Did the person who betrayed someone ever seem to understand the damage they caused?',
    'If you were the one betrayed, is there anything that would make it forgivable to you?',
  ],
  comingofage: [
    'What’s the moment this character stops being a child, even if the book never says it outright?',
    'Is there an adult in this book who fails the character in some way? How?',
    'What did this character believe at the start that they no longer believe by the end?',
    'Which mistake felt necessary for the character to grow, even though it hurt?',
    'Does this book’s version of growing up match your own experience, or feel foreign to it?',
  ],
  foundfamily: [
    'What does this group give each other that their actual families didn’t?',
    'Is there a moment the found family almost falls apart? What holds it together, or doesn’t?',
    'Who in this group do you think needed the others the most?',
    'Is loyalty in this group ever tested against something bigger than the group itself?',
    'Does this relationship in the book resemble any real relationship of yours?',
  ],
  power: [
    'At what point does the powerful character stop justifying their actions, even to themselves?',
    'Who pays the price for this character’s power that the character never sees?',
    'Is there a moment they could have used their power differently, and chose not to?',
    'Does the book suggest power corrupted this character, or just revealed who they already were?',
    'Who resists this power, even in a small way? What does it cost them?',
  ],
  justice: [
    'Does the ending feel just to you, even if it’s not what the law or the characters called justice?',
    'Who wanted justice, and who wanted revenge — did the book treat those the same?',
    'Is there a character who got away with something? How did that sit with you?',
    'What would true justice have looked like here, if the author had let it happen?',
    'Did the system in this book — law, family, society — fail anyone specifically?',
  ],
  moralambiguity: [
    'Which character’s actions did you defend to yourself, even though you knew they were wrong?',
    'Is there a decision in this book with no clearly right answer? What would you have done?',
    'Did the book ask you to judge a character, or just to understand them?',
    'Whose side of the moral question got more sympathy from the narrative — did you agree with that choice?',
    'Is there a character whose morality you misjudged early on, and had to revise?',
  ],
  obsession: [
    'What need is the obsession actually standing in for?',
    'Is there a moment the character could see the obsession clearly, from the outside, and kept going anyway?',
    'What did this character lose because of what they were fixated on?',
    'Does the book treat the obsession as understandable, tragic, or dangerous — and do you agree?',
    'Is there something in your own life this obsession reminded you of, even in a small way?',
  ],
  memory: [
    'Is there a memory the character keeps returning to? Why that one, and not another?',
    'Does the book suggest memory here is reliable, or reshaped by what the character wants to believe?',
    'What does this character do with a memory they’d rather forget?',
    'Is there a sensory detail — a smell, a sound, a place — that triggers memory in this book?',
    'What’s a memory of your own that this book brought back, even unexpectedly?',
  ],
  fear: [
    'What is the character actually afraid of, underneath the thing they say they’re afraid of?',
    'Is there a moment fear stops the character from doing something they wanted to do?',
    'Does facing the fear change the character, or just delay it?',
    'Whose fear in this book felt the most rational to you, even if the character was ashamed of it?',
    'Is there a fear in this book you recognized in yourself?',
  ],
  freedom: [
    'What is this character actually free from, and what are they still trapped by, even after gaining freedom?',
    'Is there a moment freedom turns out to be less satisfying than the character expected?',
    'Who or what is confining this character — is it external, or something they’ve internalized?',
    'Does the book suggest freedom always has to cost something?',
    'What would you have done with the freedom this character was given?',
  ],
  mortality: [
    'How does this character’s awareness of death change how they act, if at all?',
    'Is there a moment the book treats death matter-of-factly, and a moment it treats it with weight? What’s the difference?',
    'What does this character want to leave behind, or be remembered for?',
    'Did a death in this book feel earned by the story, or arbitrary?',
    'Has this book changed how you think about your own mortality, even slightly?',
  ],
  ambition: [
    'What is this character actually chasing — status, security, love, or something they can’t quite name?',
    'Is there a point their ambition costs them something they didn’t expect to lose?',
    'Does the book present their ambition as admirable, dangerous, or both?',
    'Who gets left behind because of this character’s drive to succeed?',
    'Would you trade what this character traded, for what they got?',
  ],
  forgiveness: [
    'Is there a character who forgives too easily, or one who can’t forgive at all? Which did you understand more?',
    'What does forgiveness actually cost the person giving it, in this story?',
    'Is there an act in this book you personally don’t think deserves forgiveness, even if a character grants it?',
    'Does forgiving someone in this book change the relationship, or just end the conflict?',
    'Is there something in your own life this theme made you think about?',
  ],
  resilience: [
    'What actually gets this character through the hardest part — a person, a belief, or stubbornness?',
    'Is there a moment they almost give up? What tips them back?',
    'Does the book suggest resilience is a choice, or something forced on people by circumstance?',
    'What did this character’s resilience cost them, even as it helped them survive?',
    'Did this character’s way of enduring something remind you of how you’ve gotten through hard times?',
  ],
  class: [
    'How does class or money quietly shape decisions in this book, even in scenes not explicitly about it?',
    'Is there a character who can’t see their own privilege? What would it take for them to see it?',
    'Does the book suggest anyone can actually cross the class line it sets up, or is that mostly an illusion?',
    'Who pays the real cost of the inequality shown in this book?',
    'Did this book change how you notice class dynamics in your own life?',
  ],
  hope: [
    'Is there a moment hope in this book feels almost naive, given what the character already knows?',
    'What does the character actually do with their hope — does it move them to act, or just help them survive?',
    'Who or what keeps this character’s hope alive, even when the story gives them reasons to give up?',
    'Is there a point the story could have let hope die, and chose not to?',
    'Has this book’s version of hope ever mirrored something you’ve held onto yourself?',
  ],
  jealousy: [
    'What is the character actually afraid of losing, underneath the jealousy?',
    'Is there a moment jealousy makes this character act in a way they’d normally be ashamed of?',
    'Who does the jealousy actually hurt more — the person feeling it, or the person it’s aimed at?',
    'Does the book treat jealousy as something to overcome, or as revealing a truth the character needed to face?',
    'Have you ever recognized a version of this jealousy in yourself?',
  ],
  sacrifice: [
    'What does the character actually give up, and do they fully understand the cost when they choose it?',
    'Is there a sacrifice in this book the story frames as noble, but you read differently?',
    'Who benefits from this sacrifice, and do they know what it cost?',
    'Is there a point the character could have chosen a smaller sacrifice, and didn’t?',
    'Would you have made the same trade this character made?',
  ],
  transformation: [
    'What’s the exact moment you’d point to as when this character truly changed, not just aged or moved on?',
    'Is there a part of who they were before that never actually goes away, even after the change?',
    'Did this character choose their transformation, or did it happen to them?',
    'Is there someone in the story who refuses to see the character as changed? Why?',
    'Has a change like this ever happened to you, even on a smaller scale?',
  ],
  escapism: [
    'What is the character actually escaping — a place, a person, or a version of themselves?',
    'Is there a cost to the escape that the character doesn’t see coming?',
    'Does the story suggest the escape actually solves anything, or just delays the problem?',
    'Is there a moment reality catches up to the character, no matter how far they’ve run?',
    'What do you personally use as an escape, and did this book make you look at that differently?',
  ],
  duty: [
    'What does this character sacrifice personally in order to fulfill what’s expected of them?',
    'Is there a moment they could abandon their duty and don’t — what stops them?',
    'Does the book present duty as noble, as a trap, or as both at once?',
    'Who defined this character’s duty for them — themselves, or someone else?',
    'Is there a duty in your own life that feels similar to this character’s?',
  ],
  secrets: [
    'What is this secret actually protecting — the character, or someone else?',
    'Is there a moment the secret almost comes out, and doesn’t? What’s at stake in that moment?',
    'Does keeping the secret cost the character more than telling it would have?',
    'Who do you think deserved to know the secret, but never found out?',
    'Have you ever kept a secret that changed how you saw yourself?',
  ],
  lostinnocence: [
    'What specific moment marks the loss of innocence for this character — a single before-and-after, not a gradual fade?',
    'Is there an adult in the story who could have protected that innocence, and failed to?',
    'Does the book treat this loss as tragic, necessary, or both?',
    'What does the character understand after this moment that they couldn’t have understood before?',
    'Is there a moment in your own life you’d point to the same way?',
  ],
  displacement: [
    'What does "home" actually mean to this character by the end — a place, a person, or something else?',
    'Is there a moment the character feels like they belong nowhere at all? What triggers it?',
    'What does the character carry with them from the place they left?',
    'Does the story suggest they can ever fully belong somewhere new, or is this permanent?',
    'Have you ever felt what this character feels about home?',
  ],
  faith: [
    'Is there a moment the character’s faith is tested in a way that could break it completely?',
    'Does the book present faith as something chosen, or something the character can’t help but feel?',
    'What does the character do when faith and evidence seem to contradict each other?',
    'Who around the character doesn’t share their faith — how does that relationship survive it?',
    'Has this book made you question or reaffirm something you believe?',
  ],
  trauma: [
    'How does this character’s past show up in decisions that seem, on the surface, unrelated to it?',
    'Is there a moment someone tries to help and makes it worse, without meaning to?',
    'Does the book let this character heal, or does it end with the wound still open?',
    'What does this character do to survive it that isn’t necessarily healthy, but works for them anyway?',
    'Has this book helped you understand something in your own life, or someone else’s?',
  ],
  addiction: [
    'What need is the addiction actually filling, underneath the thing itself?',
    'Is there a moment the character sees clearly what it’s costing them, and continues anyway?',
    'Who around this character enables it, even unintentionally?',
    'Does the book treat recovery, if it happens, as a straight line, or something messier?',
    'Has this book changed how you think about addiction in someone you know?',
  ],
  parenthood: [
    'What is this parent trying to give their child that they themselves never had?',
    'Is there a moment this character repeats a mistake their own parent made, despite trying not to?',
    'Does the book judge this parent, or just show them doing their best with what they have?',
    'What does the child in this story understand about their parent that the parent doesn’t realize they know?',
    'Has this book changed how you see your own parents, or how you think about becoming one?',
  ],
  friendship: [
    'What does this friendship survive that would have ended a weaker one?',
    'Is there a moment one friend needs more from the other than the other can give?',
    'Does the book suggest this friendship changes both people equally, or one more than the other?',
    'Is there an unspoken tension in this friendship that never gets addressed directly?',
    'Does this friendship remind you of one of your own?',
  ],
  revenge: [
    'What is the character actually hoping revenge will fix, beyond the person they’re targeting?',
    'Is there a moment revenge is within reach and the character hesitates? What does that reveal?',
    'Does getting revenge, if it happens, feel like the relief the character expected?',
    'Who gets hurt by this revenge that wasn’t the original target?',
    'Do you think the person being targeted actually deserved what came for them?',
  ],
};

const THEME_QUESTIONS = {};
Object.keys(THEME_QUESTIONS_RAW).forEach((theme) => {
  THEME_QUESTIONS[theme] = THEME_QUESTIONS_RAW[theme].map((text, i) => ({ id: `${theme}-${i}`, text, theme }));
});

/* Picks the next batch of questions for a book: theme pools if tagged (walked
   in shallow-to-personal order, skipping anything already answered), falling
   back to the generic stage-based bank if no themes are tagged yet. */
function getQuestionsForBook(book, count) {
  const answeredIds = new Set((book.notes || []).filter((n) => n.questionId).map((n) => n.questionId));
  const themes = book.themes || [];

  if (themes.length) {
    const pools = themes.map((t) => (THEME_QUESTIONS[t] || []).filter((q) => !answeredIds.has(q.id)));
    const picked = [];
    let idx = 0;
    while (picked.length < count && pools.some((p) => idx < p.length)) {
      pools.forEach((p) => {
        if (picked.length < count && p[idx]) picked.push(p[idx]);
      });
      idx++;
    }
    if (picked.length < count) {
      const genericPool = QUESTION_BANK.filter(
        (q) => (q.stage === 'any' || q.stage === book.status) && !answeredIds.has(q.id)
      ).sort(() => Math.random() - 0.5);
      genericPool.forEach((q) => {
        if (picked.length < count) picked.push(q);
      });
    }
    return picked.slice(0, count);
  }

  const pool = QUESTION_BANK.filter((q) => (q.stage === 'any' || q.stage === book.status) && !answeredIds.has(q.id));
  const shuffled = pool.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/* ---------- data layer ---------- */

function defaultData() {
  return {
    books: [],
    logs: [], // { date: 'YYYY-MM-DD', pages: number, minutes: number, ts }
    goal: { targetBooksPerYear: 12 },
    lastVisitedBookId: null,
    appliedWisdom: [], // { id, date, ts, sourceBookId, sourceBookTitle, sourceNoteId, sourceText, reaction, note }
    connections: [], // { id, ts, bookATitle, bookBTitle, prompt, note }
    updatedAt: 0,
  };
}

function normalizeBook(b) {
  return {
    id: b.id || uid(),
    title: b.title || 'Untitled',
    author: b.author || '',
    genre: b.genre || '',
    status: b.status || 'want',
    totalPages: b.totalPages || null,
    currentPage: b.currentPage || 0,
    rating: b.rating || null,
    dateAdded: b.dateAdded || new Date().toISOString(),
    dateStarted: b.dateStarted || null,
    dateFinished: b.dateFinished || null,
    notes: Array.isArray(b.notes) ? b.notes : [],
    themes: Array.isArray(b.themes) ? b.themes : [],
    vocabulary: Array.isArray(b.vocabulary) ? b.vocabulary : [],
    recommendedBy: b.recommendedBy || '',
    pauseReason: b.pauseReason || null,
    pausedAt: b.pausedAt || null,
  };
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    const parsed = JSON.parse(raw);
    return {
      books: Array.isArray(parsed.books) ? parsed.books.map(normalizeBook) : [],
      logs: Array.isArray(parsed.logs) ? parsed.logs : [],
      goal: Object.assign({ targetBooksPerYear: 12 }, parsed.goal || {}),
      lastVisitedBookId: parsed.lastVisitedBookId || null,
      appliedWisdom: Array.isArray(parsed.appliedWisdom) ? parsed.appliedWisdom : [],
      connections: Array.isArray(parsed.connections) ? parsed.connections : [],
      updatedAt: parsed.updatedAt || 0,
    };
  } catch (e) {
    return defaultData();
  }
}

function saveData(data) {
  data.updatedAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  scheduleCloudPush(data);
}

/* ---------- cloud sync (Firebase) ----------
   Links this device to others via a shared "sync code". Whoever has the
   same code reads/writes the same Firestore document. Newest updatedAt wins. */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAQRH7_SKS_s-Bqy2zsh0cQIrL-QP4iHpQ",
  authDomain: "book-talk-e6fea.firebaseapp.com",
  projectId: "book-talk-e6fea",
  storageBucket: "book-talk-e6fea.firebasestorage.app",
  messagingSenderId: "97088561899",
  appId: "1:97088561899:web:43ce3c420c9fbbfcb594ae",
};
const SYNC_CODE_KEY = 'bookTalkSyncCode';

let cloudDb = null;
let cloudPushTimer = null;
let applyingRemoteUpdate = false;

function getSyncCode() {
  return (localStorage.getItem(SYNC_CODE_KEY) || '').trim();
}

function setSyncCode(code) {
  localStorage.setItem(SYNC_CODE_KEY, code.trim());
}

function updateSyncStatusUI() {
  const el = document.getElementById('syncLink');
  if (!el) return;
  const code = getSyncCode();
  el.textContent = code ? '🔗 Synced' : '🔗 Sync';
  el.title = code ? `Linked with sync code "${code}"` : 'Not linked to another device yet';
}

function attachCloudListener(code) {
  if (!cloudDb || !code) return;
  const docRef = cloudDb.collection('syncData').doc(code);
  docRef.onSnapshot(
    (snap) => {
      const local = loadData();
      if (!snap.exists) {
        docRef.set(local).catch((e) => console.error('Book Talk: initial sync push failed', e));
        return;
      }
      const remote = snap.data();
      if ((remote.updatedAt || 0) > (local.updatedAt || 0)) {
        applyingRemoteUpdate = true;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(remote));
        applyingRemoteUpdate = false;
        if (typeof route === 'function') route();
      } else if ((local.updatedAt || 0) > (remote.updatedAt || 0)) {
        docRef.set(local).catch((e) => console.error('Book Talk: sync push failed', e));
      }
    },
    (e) => console.error('Book Talk: sync listener error', e)
  );
}

function scheduleCloudPush(data) {
  const code = getSyncCode();
  if (!code || !cloudDb || applyingRemoteUpdate) return;
  clearTimeout(cloudPushTimer);
  cloudPushTimer = setTimeout(() => {
    cloudDb
      .collection('syncData')
      .doc(code)
      .set(data)
      .catch((e) => console.error('Book Talk: sync push failed', e));
  }, 800);
}

function promptForSyncCode() {
  const existing = getSyncCode();
  const input = window.prompt(
    existing
      ? 'This device is linked with the sync code below. Enter the same code on your other device to link it too (or change it here to re-link this one):'
      : 'Make up a sync code (any word or phrase) and enter the exact same one on every device you want to keep in sync:',
    existing
  );
  if (input && input.trim()) {
    setSyncCode(input);
    updateSyncStatusUI();
    attachCloudListener(input.trim());
  }
}

function initCloudSync() {
  if (typeof firebase === 'undefined') return;
  firebase.initializeApp(FIREBASE_CONFIG);
  cloudDb = firebase.firestore();
  firebase
    .auth()
    .signInAnonymously()
    .catch((e) => console.error('Book Talk: sync sign-in failed', e));
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) return;
    const code = getSyncCode();
    if (code) attachCloudListener(code);
  });
  updateSyncStatusUI();
}

/* ---------- small utilities ---------- */

function uid() {
  return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

function esc(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

function statusLabel(status) {
  return { want: 'Want to read', reading: 'Reading', paused: 'Paused', finished: 'Finished' }[status] || status;
}

function countStatuses(books) {
  return books.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, { want: 0, reading: 0, paused: 0, finished: 0 });
}

const PAUSE_REASONS = [
  { key: 'lost-interest', label: 'Lost interest' },
  { key: 'wrong-mood', label: 'Not the right mood' },
  { key: 'too-dense', label: 'Got too dense' },
  { key: 'distracted', label: 'Something else pulled me away' },
];

function countByPauseReason(books) {
  const counts = {};
  books.forEach((b) => {
    if (b.status === 'paused' && b.pauseReason) {
      counts[b.pauseReason] = (counts[b.pauseReason] || 0) + 1;
    }
  });
  return counts;
}

function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function todayStr() {
  return formatDate(new Date());
}

function bookExists(data, title, author) {
  return data.books.some(
    (b) => b.title.toLowerCase() === title.toLowerCase() && b.author.toLowerCase() === author.toLowerCase()
  );
}

function findBook(data, title, author) {
  return data.books.find(
    (b) => b.title.toLowerCase() === title.toLowerCase() && b.author.toLowerCase() === author.toLowerCase()
  );
}

function addBookToLibrary(data, { title, author, genre, recommendedBy }) {
  if (bookExists(data, title, author)) return null;
  const book = normalizeBook({
    id: uid(),
    title,
    author,
    genre: genre || '',
    status: 'want',
    recommendedBy: recommendedBy || '',
  });
  data.books.unshift(book);
  return book;
}

function countFinishedThisYear(books) {
  const year = new Date().getFullYear();
  return books.filter(
    (b) => b.status === 'finished' && b.dateFinished && new Date(b.dateFinished).getFullYear() === year
  ).length;
}

function countFinishedByMonth(books) {
  const year = new Date().getFullYear();
  const counts = new Array(12).fill(0);
  books.forEach((b) => {
    if (b.status === 'finished' && b.dateFinished) {
      const d = new Date(b.dateFinished);
      if (d.getFullYear() === year) counts[d.getMonth()]++;
    }
  });
  return counts;
}

function countByGenre(books) {
  const counts = {};
  books.forEach((b) => {
    const g = b.genre && b.genre.trim() ? b.genre.trim() : 'Unspecified';
    counts[g] = (counts[g] || 0) + 1;
  });
  return counts;
}

function countByTheme(books) {
  const counts = {};
  books.forEach((b) => {
    (b.themes || []).forEach((t) => {
      counts[t] = (counts[t] || 0) + 1;
    });
  });
  return counts;
}

/* ---------- Today's Wisdom: resurfaces your own past notes, tap-first ---------- */

const WISDOM_REACTIONS = [
  { key: 'resonates', emoji: '💡', label: 'Still resonates' },
  { key: 'changed', emoji: '🔄', label: "I've changed since I wrote this" },
  { key: 'living', emoji: '✅', label: 'Already living this' },
  { key: 'complicated', emoji: '🌀', label: 'Complicated' },
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function collectAllNotes(data) {
  const all = [];
  data.books.forEach((b) => {
    (b.notes || []).forEach((n) => {
      all.push({ bookId: b.id, bookTitle: b.title, noteId: n.id, text: n.text });
    });
  });
  return all;
}

function pickTodaysWisdomNote(data) {
  const all = collectAllNotes(data);
  if (!all.length) return null;
  const seenIds = new Set((data.appliedWisdom || []).map((w) => w.sourceNoteId));
  const unseen = all.filter((n) => !seenIds.has(n.noteId));
  const pool = unseen.length ? unseen : all;
  const idx = hashString(todayStr()) % pool.length;
  return pool[idx];
}

/* ---------- Cross-book "what if" connections ---------- */

const CONNECTION_TEMPLATES = [
  (a, b, theme) => `Both "${a}" and "${b}" deal with ${theme}. If they disagreed about how to handle it, whose approach would you trust more today?`,
  (a, b, theme) => `Imagine the authors of "${a}" and "${b}" arguing about ${theme} over dinner. Who do you think would concede first, and why?`,
  (a, b, theme) => `"${a}" and "${b}" both touch on ${theme} — what would change if you swapped which book's approach you lived by?`,
  (a, b, theme) => `If a character from "${a}" gave advice to a character from "${b}" about ${theme}, what do you think they'd say?`,
];

const CONNECTION_TEMPLATES_GENERIC = [
  (a, b) => `If "${a}" and "${b}" were each trying to teach you one lesson about life, and you could only keep one, which would you keep — and why?`,
  (a, b) => `Is there a character from "${a}" who would get along with a character from "${b}"? Why do you think so?`,
  (a, b) => `What would "${a}" say is missing from "${b}", or the other way around?`,
  (a, b) => `If you had to argue that "${a}" and "${b}" secretly agree with each other, what would you say?`,
];

function pickConnection(data) {
  const books = data.books;
  if (books.length < 2) return null;

  const themedPairs = [];
  for (let i = 0; i < books.length; i++) {
    for (let j = i + 1; j < books.length; j++) {
      const shared = (books[i].themes || []).filter((t) => (books[j].themes || []).includes(t));
      if (shared.length) themedPairs.push({ a: books[i], b: books[j], theme: shared[Math.floor(Math.random() * shared.length)] });
    }
  }

  if (themedPairs.length) {
    const pick = themedPairs[Math.floor(Math.random() * themedPairs.length)];
    const template = CONNECTION_TEMPLATES[Math.floor(Math.random() * CONNECTION_TEMPLATES.length)];
    const themeLabel = (THEME_LABELS[pick.theme] || pick.theme).toLowerCase();
    return { a: pick.a, b: pick.b, prompt: template(pick.a.title, pick.b.title, themeLabel) };
  }

  const i = Math.floor(Math.random() * books.length);
  let j = Math.floor(Math.random() * books.length);
  while (j === i) j = Math.floor(Math.random() * books.length);
  const template = CONNECTION_TEMPLATES_GENERIC[Math.floor(Math.random() * CONNECTION_TEMPLATES_GENERIC.length)];
  return { a: books[i], b: books[j], prompt: template(books[i].title, books[j].title) };
}

/* ---------- badges ---------- */

const PERSONA_BADGES = [
  { id: 'melancholy-wanderer', label: 'The Melancholy Wanderer', themes: ['loneliness', 'grief', 'longing', 'displacement'], min: 3 },
  { id: 'philosopher', label: 'The Philosopher', themes: ['moralambiguity', 'justice', 'faith', 'identity'], min: 3 },
  { id: 'optimist', label: 'The Optimist', themes: ['hope', 'resilience', 'forgiveness'], min: 3 },
  { id: 'strategist', label: 'The Strategist', themes: ['power', 'ambition', 'revenge'], min: 3 },
  { id: 'connector', label: 'The Connector', themes: ['friendship', 'foundfamily', 'parenthood'], min: 3 },
  { id: 'survivor', label: 'The Survivor', themes: ['trauma', 'addiction', 'fear', 'sacrifice'], min: 3 },
];

function countVocabulary(books) {
  return books.reduce((sum, b) => sum + (b.vocabulary || []).length, 0);
}

function computeBadges(data) {
  const streaks = computeStreaks(data.logs);
  const finishedCount = countStatuses(data.books).finished;
  const appliedCount = (data.appliedWisdom || []).length;
  const connectionCount = (data.connections || []).length;
  const vocabCount = countVocabulary(data.books);
  const themeCounts = countByTheme(data.books);

  const badges = [
    { id: 'streak-3', emoji: '🔥', label: 'Spark', unlocked: streaks.longest >= 3 },
    { id: 'streak-7', emoji: '🔥', label: 'Steady', unlocked: streaks.longest >= 7 },
    { id: 'streak-30', emoji: '🔥', label: 'Unstoppable', unlocked: streaks.longest >= 30 },
    { id: 'finish-1', emoji: '📖', label: 'First Chapter', unlocked: finishedCount >= 1 },
    { id: 'finish-5', emoji: '📚', label: 'Bookworm', unlocked: finishedCount >= 5 },
    { id: 'finish-20', emoji: '🏛️', label: 'Voracious Reader', unlocked: finishedCount >= 20 },
    { id: 'wisdom-5', emoji: '💡', label: 'Sage in Training', unlocked: appliedCount >= 5 },
    { id: 'wisdom-20', emoji: '🕯️', label: 'Old Soul', unlocked: appliedCount >= 20 },
    { id: 'connection-5', emoji: '🌉', label: 'Bridge Builder', unlocked: connectionCount >= 5 },
    { id: 'vocab-25', emoji: '🔤', label: 'Wordsmith', unlocked: vocabCount >= 25 },
    { id: 'vocab-100', emoji: '🌐', label: 'Polyglot', unlocked: vocabCount >= 100 },
  ];

  PERSONA_BADGES.forEach((p) => {
    const count = p.themes.reduce((sum, t) => sum + (themeCounts[t] || 0), 0);
    badges.push({ id: p.id, emoji: '🎭', label: p.label, unlocked: count >= p.min });
  });

  return badges;
}

/* ---------- streaks & habit log ---------- */

function addLog(data, { pages, minutes } = {}) {
  const date = todayStr();
  let entry = data.logs.find((l) => l.date === date);
  if (!entry) {
    entry = { date, pages: 0, minutes: 0, ts: Date.now() };
    data.logs.push(entry);
  }
  if (pages) entry.pages += pages;
  if (minutes) entry.minutes += minutes;
  entry.ts = Date.now();
}

function computeStreaks(logs) {
  const datesSet = new Set(logs.map((l) => l.date));

  let current = 0;
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  if (!datesSet.has(formatDate(d))) {
    d.setDate(d.getDate() - 1);
  }
  while (datesSet.has(formatDate(d))) {
    current++;
    d.setDate(d.getDate() - 1);
  }

  const sorted = Array.from(datesSet).sort();
  let longest = 0;
  let run = 0;
  let prev = null;
  sorted.forEach((ds) => {
    if (prev) {
      const diffDays = Math.round((new Date(ds) - new Date(prev)) / 86400000);
      run = diffDays === 1 ? run + 1 : 1;
    } else {
      run = 1;
    }
    longest = Math.max(longest, run);
    prev = ds;
  });

  return { current, longest };
}

function buildHeatmapWeeks(logs, weeks) {
  const logMap = {};
  logs.forEach((l) => { logMap[l.date] = l; });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const gridEnd = new Date(today);
  gridEnd.setDate(today.getDate() + (6 - today.getDay()));
  const totalDays = weeks * 7;
  const gridStart = new Date(gridEnd);
  gridStart.setDate(gridEnd.getDate() - totalDays + 1);

  const days = [];
  for (let i = 0; i < totalDays; i++) {
    const dt = new Date(gridStart);
    dt.setDate(gridStart.getDate() + i);
    const ds = formatDate(dt);
    const entry = logMap[ds];
    let level = 0;
    if (dt > today) {
      level = -1;
    } else if (entry) {
      const amount = (entry.pages || 0) + (entry.minutes || 0);
      level = amount > 40 ? 3 : amount > 15 ? 2 : 1;
    }
    days.push({ date: ds, level });
  }
  return days;
}

function pickForMe(data) {
  const wantBooks = data.books.filter((b) => b.status === 'want');
  if (wantBooks.length) {
    return { source: 'library', book: wantBooks[Math.floor(Math.random() * wantBooks.length)] };
  }
  return { source: 'starter', book: STARTER_BOOKS[Math.floor(Math.random() * STARTER_BOOKS.length)] };
}

/* ---------- book search (Open Library — free, no key, no signup) ---------- */

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

async function searchOpenLibrary(query) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&fields=title,author_name,cover_i,first_publish_year,key&limit=12`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Search failed (${resp.status})`);
  const data = await resp.json();
  return (data.docs || []).map((doc) => ({
    title: doc.title,
    author: (doc.author_name && doc.author_name[0]) || 'Unknown author',
    year: doc.first_publish_year || null,
    coverId: doc.cover_i || null,
    workKey: doc.key || null,
  }));
}

function extractDescriptionText(data) {
  if (!data || !data.description) return null;
  const text = typeof data.description === 'string' ? data.description : data.description.value;
  return text ? text.trim() : null;
}

async function fetchWorkDescription(workKey) {
  if (!workKey) return null;
  const resp = await fetch(`https://openlibrary.org${workKey}.json`);
  if (!resp.ok) return null;
  const data = await resp.json();
  const text = extractDescriptionText(data);
  if (!text) return null;
  const oneLine = text.replace(/\s+/g, ' ').trim();
  return oneLine.length > 240 ? `${oneLine.slice(0, 240).trim()}…` : oneLine;
}

/* In-memory only (not persisted) — carries search-result data (title/author/
   year/cover) from a search card click over to the preview page, so the
   preview doesn't need to re-resolve the author separately. */
const previewCache = {};

/* Caches Open Library lookups for the static starter shelf, keyed by
   title+author, so switching the tag filter doesn't re-hit the network. */
const starterLookupCache = {};

function getStarterOpenLibraryInfo(book) {
  const key = `${book.title}|${book.author}`;
  if (!starterLookupCache[key]) {
    starterLookupCache[key] = searchOpenLibrary(`${book.title} ${book.author}`)
      .then((results) => results[0] || null)
      .catch(() => null);
  }
  return starterLookupCache[key];
}

async function renderPreviewPage(app, workKeyRaw) {
  const workKey = decodeURIComponent(workKeyRaw || '');
  const cached = previewCache[workKey] || {};
  app.innerHTML = '';

  const back = document.createElement('a');
  back.className = 'back-link';
  back.href = '#/discover';
  back.textContent = '← Back';
  app.appendChild(back);

  const card = document.createElement('div');
  card.className = 'card';
  const coverHtml = cached.coverId
    ? `<img src="https://covers.openlibrary.org/b/id/${cached.coverId}-L.jpg" alt="" style="width:170px;border-radius:10px;box-shadow:var(--shadow);margin-bottom:16px;display:block;" />`
    : '';
  card.innerHTML = `${coverHtml}
    <h1>${esc(cached.title || 'Book preview')}</h1>
    <div class="book-author" style="font-size:1rem;margin-bottom:14px;">${esc(cached.author || 'Unknown author')}${cached.year ? ` · ${esc(cached.year)}` : ''}</div>
    <div id="preview-desc" class="muted-text" style="padding:0;">Loading full description…</div>
    <div id="preview-actions" style="margin-top:18px;"></div>`;
  app.appendChild(card);

  const descEl = card.querySelector('#preview-desc');
  const actionsEl = card.querySelector('#preview-actions');

  function renderActions() {
    actionsEl.innerHTML = '';
    if (!cached.title) return;
    const d = loadData();
    const already = bookExists(d, cached.title, cached.author || '');
    const btn = document.createElement('button');
    btn.className = 'btn btn-small ' + (already ? 'btn-ghost' : 'btn-primary');
    btn.textContent = already ? 'In your library' : 'Add to want-to-read';
    btn.disabled = already;
    btn.addEventListener('click', () => {
      const dd = loadData();
      addBookToLibrary(dd, { title: cached.title, author: cached.author || '', genre: '' });
      saveData(dd);
      renderActions();
    });
    actionsEl.appendChild(btn);
  }
  renderActions();

  if (!workKey) {
    descEl.textContent = 'No further details available for this result.';
    return;
  }

  try {
    const resp = await fetch(`https://openlibrary.org${workKey}.json`);
    if (!resp.ok) throw new Error(`Failed (${resp.status})`);
    const data = await resp.json();
    const desc = extractDescriptionText(data);
    descEl.textContent = desc || 'No description available for this book.';
    descEl.style.whiteSpace = 'pre-wrap';
    descEl.style.lineHeight = '1.6';
    if (!cached.title && data.title) {
      card.querySelector('h1').textContent = data.title;
      cached.title = data.title;
      renderActions();
    }
  } catch (err) {
    descEl.textContent = `Couldn't load the full description (${err.message}). Check your internet connection.`;
  }
}

/* ---------- vocabulary lookup (free dictionary + free translation, no keys) ---------- */

async function lookupWordDefinition(word) {
  const resp = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.trim().toLowerCase())}`);
  if (resp.status === 404) return null;
  if (!resp.ok) throw new Error(`Definition lookup failed (${resp.status})`);
  const data = await resp.json();
  const entry = data[0];
  if (!entry) return null;
  const phonetic = entry.phonetic || (entry.phonetics || []).map((p) => p.text).find(Boolean) || '';
  const meanings = (entry.meanings || []).slice(0, 2).map((m) => ({
    partOfSpeech: m.partOfSpeech,
    definition: (m.definitions || [])[0] ? m.definitions[0].definition : '',
    example: (m.definitions || [])[0] ? m.definitions[0].example : '',
  }));
  return { word: entry.word, phonetic, meanings };
}

async function translateWord(word, targetLang) {
  const resp = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|${targetLang}`
  );
  if (!resp.ok) throw new Error(`Translation failed (${resp.status})`);
  const data = await resp.json();
  return data && data.responseData && data.responseData.translatedText ? data.responseData.translatedText : null;
}

function renderVocabularyCard(app, bookId) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<div class="card-title">Vocabulary</div>
    <div class="muted-text" style="padding:0;font-size:0.82rem;margin-bottom:10px;">Look up a word for its English definition and Thai translation, or paste in a whole confusing phrase for just the Thai translation — either way it's saved to this book's list automatically.</div>
    <div style="display:flex;gap:8px;">
      <input type="text" id="vocab-input" placeholder="Type a word or short phrase…" style="flex:1;" />
      <button class="btn btn-primary btn-small" id="vocab-lookup-btn">Look up</button>
    </div>
    <div id="vocab-result" style="margin-top:12px;"></div>
    <div id="vocab-list" style="margin-top:16px;"></div>`;
  app.appendChild(card);

  const input = card.querySelector('#vocab-input');
  const lookupBtn = card.querySelector('#vocab-lookup-btn');
  const resultEl = card.querySelector('#vocab-result');
  const listEl = card.querySelector('#vocab-list');

  function refreshVocabList() {
    const d = loadData();
    const b = d.books.find((x) => x.id === bookId);
    listEl.innerHTML = '';
    if (!b || !b.vocabulary.length) {
      const p = document.createElement('p');
      p.className = 'muted-text';
      p.style.padding = '0';
      p.textContent = 'No words saved yet for this book.';
      listEl.appendChild(p);
      return;
    }
    b.vocabulary
      .slice()
      .reverse()
      .forEach((v) => {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.justifyContent = 'space-between';
        row.style.alignItems = 'flex-start';
        row.style.gap = '10px';
        row.style.padding = '8px 0';
        row.style.borderBottom = '1px solid var(--border)';
        row.innerHTML = `<div>
          <b>${esc(v.word)}</b>${v.translation ? ` — <span style="color:var(--amber-dark);">${esc(v.translation)}</span>` : ''}
          ${v.definition ? `<div style="color:var(--ink-soft);font-size:0.85rem;margin-top:2px;">${esc(v.definition)}</div>` : ''}
        </div>`;
        const delBtn = document.createElement('button');
        delBtn.className = 'btn btn-ghost btn-small';
        delBtn.textContent = '✕';
        delBtn.addEventListener('click', () => {
          const dd = loadData();
          const bb = dd.books.find((x) => x.id === bookId);
          if (!bb) return;
          bb.vocabulary = bb.vocabulary.filter((x) => x.id !== v.id);
          saveData(dd);
          refreshVocabList();
        });
        row.appendChild(delBtn);
        listEl.appendChild(row);
      });
  }

  async function doLookup() {
    const word = input.value.trim();
    if (!word) return;
    const isPhrase = /\s/.test(word);
    resultEl.innerHTML = '<p class="muted-text" style="padding:0;">Looking up…</p>';

    let definitionResult = null;
    let translation = null;
    let anyError = null;
    if (!isPhrase) {
      try {
        definitionResult = await lookupWordDefinition(word);
      } catch (err) {
        anyError = err.message;
      }
    }
    try {
      translation = await translateWord(word, 'th');
    } catch (err) {
      anyError = anyError || err.message;
    }

    if (!definitionResult && !translation) {
      resultEl.innerHTML = `<p class="muted-text" style="padding:0;">Couldn't look that up (${esc(anyError || 'no results')}). Check your internet connection.</p>`;
      return;
    }

    resultEl.innerHTML = '';
    const wrap = document.createElement('div');

    const wordLine = document.createElement('div');
    wordLine.style.fontFamily = 'Georgia, serif';
    wordLine.style.fontSize = '1.1rem';
    wordLine.textContent = definitionResult ? definitionResult.word : word;
    if (definitionResult && definitionResult.phonetic) {
      const ph = document.createElement('span');
      ph.style.color = 'var(--ink-soft)';
      ph.style.fontSize = '0.85rem';
      ph.style.marginLeft = '8px';
      ph.textContent = definitionResult.phonetic;
      wordLine.appendChild(ph);
    }
    wrap.appendChild(wordLine);

    if (translation && translation.toLowerCase() !== word.toLowerCase()) {
      const transLine = document.createElement('div');
      transLine.style.marginTop = '4px';
      transLine.style.fontSize = '1rem';
      transLine.style.color = 'var(--amber-dark)';
      transLine.textContent = `→ ${translation}`;
      wrap.appendChild(transLine);
    }

    let firstDefText = '';
    if (definitionResult && definitionResult.meanings.length) {
      definitionResult.meanings.forEach((m) => {
        const mDiv = document.createElement('div');
        mDiv.style.marginTop = '8px';
        mDiv.innerHTML = `<span class="badge">${esc(m.partOfSpeech)}</span> ${esc(m.definition)}`;
        if (m.example) {
          const ex = document.createElement('div');
          ex.style.color = 'var(--ink-soft)';
          ex.style.fontSize = '0.85rem';
          ex.style.fontStyle = 'italic';
          ex.style.marginTop = '2px';
          ex.textContent = `"${m.example}"`;
          mDiv.appendChild(ex);
        }
        wrap.appendChild(mDiv);
      });
      firstDefText = `${definitionResult.meanings[0].partOfSpeech}: ${definitionResult.meanings[0].definition}`;
    } else if (!isPhrase) {
      const noDef = document.createElement('div');
      noDef.className = 'muted-text';
      noDef.style.padding = '0';
      noDef.style.marginTop = '6px';
      noDef.textContent = 'No English definition found.';
      wrap.appendChild(noDef);
    }

    const savedNote = document.createElement('div');
    savedNote.style.marginTop = '10px';
    savedNote.style.fontSize = '0.8rem';
    savedNote.style.color = '#2f6b3c';
    savedNote.textContent = '✓ Saved to your vocabulary list';
    wrap.appendChild(savedNote);

    resultEl.appendChild(wrap);

    const d = loadData();
    const b = d.books.find((x) => x.id === bookId);
    if (b) {
      b.vocabulary.push({
        id: uid(),
        word: definitionResult ? definitionResult.word : word,
        definition: firstDefText,
        translation: translation || '',
        ts: Date.now(),
      });
      saveData(d);
      refreshVocabList();
    }
    input.value = '';
  }

  lookupBtn.addEventListener('click', doLookup);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      doLookup();
    }
  });

  refreshVocabList();
}

function renderBookSearch(app, { title = 'Search for a book', onAdded } = {}) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<div class="card-title">${esc(title)}</div>
    <input type="text" id="search-input" placeholder="Search by title or author…" style="width:100%;" />
    <div id="search-status" class="muted-text" style="display:none;"></div>
    <div class="book-grid" id="search-results" style="margin-top:14px;"></div>`;
  app.appendChild(card);

  const input = card.querySelector('#search-input');
  const statusEl = card.querySelector('#search-status');
  const resultsEl = card.querySelector('#search-results');

  const runSearch = debounce(async () => {
    const q = input.value.trim();
    resultsEl.innerHTML = '';
    if (!q) {
      statusEl.style.display = 'none';
      return;
    }
    statusEl.style.display = 'block';
    statusEl.textContent = 'Searching…';
    try {
      const results = await searchOpenLibrary(q);
      if (!results.length) {
        statusEl.textContent = 'No matches found.';
        return;
      }
      statusEl.style.display = 'none';
      const d = loadData();
      results.forEach((r) => {
        const already = bookExists(d, r.title, r.author);
        const item = document.createElement('div');
        item.className = 'book-card';
        const coverHtml = r.coverId
          ? `<img src="https://covers.openlibrary.org/b/id/${r.coverId}-M.jpg" alt="" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:8px;" />`
          : '';
        item.innerHTML = `<div class="preview-trigger" style="cursor:pointer;">
            ${coverHtml}<h3>${esc(r.title)}</h3>
            <div class="book-author">${esc(r.author)}${r.year ? ` · ${esc(r.year)}` : ''}</div>
            <div class="book-desc muted-text" style="padding:0;font-size:0.82rem;margin-top:6px;">Loading description…</div>
          </div>`;
        if (r.workKey) {
          item.querySelector('.preview-trigger').addEventListener('click', () => {
            previewCache[r.workKey] = r;
            location.hash = `#/preview/${encodeURIComponent(r.workKey)}`;
          });
        }
        const descEl = item.querySelector('.book-desc');
        fetchWorkDescription(r.workKey)
          .then((desc) => {
            if (desc) {
              descEl.textContent = desc;
            } else {
              descEl.remove();
            }
          })
          .catch(() => descEl.remove());
        const btn = document.createElement('button');
        btn.className = 'btn btn-small ' + (already ? 'btn-ghost' : 'btn-primary');
        btn.style.marginTop = '10px';
        btn.textContent = already ? 'In your library' : 'Add to want-to-read';
        btn.disabled = already;
        btn.addEventListener('click', () => {
          const dd = loadData();
          addBookToLibrary(dd, { title: r.title, author: r.author, genre: '' });
          saveData(dd);
          btn.disabled = true;
          btn.textContent = 'In your library';
          btn.classList.remove('btn-primary');
          btn.classList.add('btn-ghost');
          if (onAdded) onAdded();
        });
        item.appendChild(btn);
        resultsEl.appendChild(item);
      });
    } catch (err) {
      statusEl.style.display = 'block';
      statusEl.textContent = `Couldn't search right now (${err.message}). Check your internet connection.`;
    }
  }, 400);

  input.addEventListener('input', runSearch);
}

/* ---------- shared bits ---------- */

function renderTodaysWisdom(container) {
  const data = loadData();
  const noteRef = pickTodaysWisdomNote(data);
  container.innerHTML = '';
  if (!noteRef) {
    const p = document.createElement('p');
    p.className = 'muted-text';
    p.style.padding = '0';
    p.textContent = "Write a reflection on a book page first — I'll start resurfacing your own past thoughts here, one a day.";
    container.appendChild(p);
    return;
  }

  const today = todayStr();
  const existing = (data.appliedWisdom || []).find((w) => w.date === today);

  const bookLine = document.createElement('div');
  bookLine.style.fontSize = '0.8rem';
  bookLine.style.color = 'var(--ink-soft)';
  bookLine.style.marginBottom = '6px';
  bookLine.textContent = `From your notes on "${noteRef.bookTitle}"`;
  container.appendChild(bookLine);

  const textEl = document.createElement('div');
  textEl.style.whiteSpace = 'pre-wrap';
  textEl.style.lineHeight = '1.5';
  textEl.style.marginBottom = '14px';
  textEl.textContent = noteRef.text;
  container.appendChild(textEl);

  const reactionRow = document.createElement('div');
  reactionRow.style.display = 'flex';
  reactionRow.style.gap = '8px';
  reactionRow.style.flexWrap = 'wrap';
  container.appendChild(reactionRow);

  const noteSlot = document.createElement('div');
  noteSlot.style.marginTop = '12px';
  container.appendChild(noteSlot);

  function reactTo(reactionKey) {
    const d = loadData();
    d.appliedWisdom = d.appliedWisdom || [];
    let entry = d.appliedWisdom.find((w) => w.date === today);
    if (!entry) {
      entry = {
        id: uid(),
        date: today,
        ts: Date.now(),
        sourceBookId: noteRef.bookId,
        sourceBookTitle: noteRef.bookTitle,
        sourceNoteId: noteRef.noteId,
        sourceText: noteRef.text,
        reaction: reactionKey,
        note: '',
      };
      d.appliedWisdom.push(entry);
    } else {
      entry.reaction = reactionKey;
      entry.ts = Date.now();
    }
    saveData(d);
    renderTodaysWisdom(container);
  }

  WISDOM_REACTIONS.forEach((r) => {
    const btn = document.createElement('button');
    btn.className = 'chip' + (existing && existing.reaction === r.key ? ' active' : '');
    btn.textContent = `${r.emoji} ${r.label}`;
    btn.addEventListener('click', () => reactTo(r.key));
    reactionRow.appendChild(btn);
  });

  if (existing) {
    const toggle = document.createElement('button');
    toggle.className = 'btn btn-ghost btn-small';
    toggle.style.marginTop = '10px';
    toggle.textContent = existing.note ? 'Edit your thought' : 'Add a thought (optional)';
    const box = document.createElement('div');
    box.style.display = 'none';
    box.style.marginTop = '8px';
    const ta = document.createElement('textarea');
    ta.style.width = '100%';
    ta.style.minHeight = '60px';
    ta.value = existing.note || '';
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-primary btn-small';
    saveBtn.textContent = 'Save';
    saveBtn.style.marginTop = '6px';
    box.appendChild(ta);
    box.appendChild(document.createElement('br'));
    box.appendChild(saveBtn);
    toggle.addEventListener('click', () => {
      box.style.display = box.style.display === 'none' ? 'block' : 'none';
    });
    saveBtn.addEventListener('click', () => {
      const d = loadData();
      const e2 = (d.appliedWisdom || []).find((w) => w.date === today);
      if (!e2) return;
      e2.note = ta.value.trim();
      saveData(d);
      renderTodaysWisdom(container);
    });
    noteSlot.appendChild(toggle);
    noteSlot.appendChild(box);
  }
}

function renderConnectionCard(app) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = '<div class="card-title">Connect two books</div><div id="connection-slot"></div>';
  app.appendChild(card);
  const slot = card.querySelector('#connection-slot');

  function showButton() {
    const data = loadData();
    slot.innerHTML = '';
    if (data.books.length < 2) {
      const p = document.createElement('p');
      p.className = 'muted-text';
      p.style.padding = '0';
      p.textContent = 'Add at least two books to unlock this.';
      slot.appendChild(p);
      return;
    }
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = 'Give me a connection';
    btn.addEventListener('click', showConnection);
    slot.appendChild(btn);
  }

  function showConnection() {
    const data = loadData();
    const conn = pickConnection(data);
    slot.innerHTML = '';
    if (!conn) {
      showButton();
      return;
    }
    const promptEl = document.createElement('div');
    promptEl.style.marginBottom = '10px';
    promptEl.style.lineHeight = '1.5';
    promptEl.textContent = conn.prompt;
    slot.appendChild(promptEl);

    const ta = document.createElement('textarea');
    ta.style.width = '100%';
    ta.style.minHeight = '60px';
    ta.placeholder = 'Optional — jot down your answer';
    slot.appendChild(ta);

    const actions = document.createElement('div');
    actions.style.marginTop = '8px';
    actions.style.display = 'flex';
    actions.style.gap = '8px';
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-primary btn-small';
    saveBtn.textContent = 'Save this connection';
    saveBtn.addEventListener('click', () => {
      const d = loadData();
      d.connections = d.connections || [];
      d.connections.push({
        id: uid(),
        ts: Date.now(),
        bookATitle: conn.a.title,
        bookBTitle: conn.b.title,
        prompt: conn.prompt,
        note: ta.value.trim(),
      });
      saveData(d);
      slot.innerHTML = '';
      const done = document.createElement('p');
      done.className = 'muted-text';
      done.style.padding = '0';
      done.textContent = 'Saved ✓';
      slot.appendChild(done);
      const another = document.createElement('button');
      another.className = 'btn btn-ghost btn-small';
      another.style.marginTop = '8px';
      another.textContent = 'Give me another';
      another.addEventListener('click', showConnection);
      slot.appendChild(another);
    });
    const anotherBtn = document.createElement('button');
    anotherBtn.className = 'btn btn-ghost btn-small';
    anotherBtn.textContent = 'Try another pair';
    anotherBtn.addEventListener('click', showConnection);
    actions.appendChild(saveBtn);
    actions.appendChild(anotherBtn);
    slot.appendChild(actions);
  }

  showButton();
}

function renderBadgeShelf(app, data) {
  const badges = computeBadges(data);
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<div class="card-title">Badge shelf</div>
    <div class="stat-grid">
      ${badges
        .map(
          (b) => `<div class="stat-box" style="${b.unlocked ? '' : 'opacity:0.35;'}">
        <div style="font-size:1.6rem;">${b.unlocked ? b.emoji : '🔒'}</div>
        <div class="stat-label">${esc(b.label)}</div>
      </div>`
        )
        .join('')}
    </div>`;
  app.appendChild(card);
}

function renderHeatmapInto(container, logs) {
  const days = buildHeatmapWeeks(logs, 18);
  container.innerHTML = '';
  days.forEach((d) => {
    const cell = document.createElement('div');
    cell.className = 'heat-cell' + (d.level === -1 ? ' future' : d.level > 0 ? ` level-${d.level}` : '');
    if (d.level !== -1) cell.title = d.date;
    container.appendChild(cell);
  });
}

function renderLogForm(container, onLogged) {
  container.innerHTML = `
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
      <button class="btn btn-primary" id="quick-log-btn">I read today ✓</button>
      <input type="number" min="0" id="log-pages" placeholder="pages" style="width:80px;" />
      <input type="number" min="0" id="log-minutes" placeholder="minutes" style="width:90px;" />
      <button class="btn btn-ghost" id="log-detail-btn">Log with details</button>
    </div>`;
  container.querySelector('#quick-log-btn').addEventListener('click', () => {
    const d = loadData();
    addLog(d);
    saveData(d);
    onLogged();
  });
  container.querySelector('#log-detail-btn').addEventListener('click', () => {
    const pages = parseInt(container.querySelector('#log-pages').value, 10) || 0;
    const minutes = parseInt(container.querySelector('#log-minutes').value, 10) || 0;
    const d = loadData();
    addLog(d, { pages, minutes });
    saveData(d);
    onLogged();
  });
}

function renderLogTodayWidget(container) {
  const data = loadData();
  const entry = data.logs.find((l) => l.date === todayStr());
  container.innerHTML = '';
  if (entry) {
    const parts = [];
    if (entry.pages) parts.push(`${entry.pages} pages`);
    if (entry.minutes) parts.push(`${entry.minutes} min`);
    const summary = parts.length ? ` (${parts.join(', ')})` : '';
    const wrap = document.createElement('div');
    const span = document.createElement('span');
    span.style.color = '#2f6b3c';
    span.textContent = `✓ Logged today${summary}`;
    wrap.appendChild(span);
    wrap.appendChild(document.createTextNode(' '));
    const addMoreBtn = document.createElement('button');
    addMoreBtn.className = 'btn btn-ghost btn-small';
    addMoreBtn.textContent = 'Add more';
    addMoreBtn.addEventListener('click', () => renderLogForm(container, () => renderLogTodayWidget(container)));
    wrap.appendChild(addMoreBtn);
    container.appendChild(wrap);
  } else {
    renderLogForm(container, () => renderLogTodayWidget(container));
  }
}

function renderPickResult(slotEl, pick) {
  slotEl.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'rec-card';
  const tagsHtml = pick.book.tags
    ? pick.book.tags.map((t) => `<span class="badge">${esc(TAG_LABELS[t] || t)}</span>`).join(' ')
    : '';
  wrap.innerHTML = `<div class="rec-cover">📖</div>
    <div class="rec-body">
      <h3>${esc(pick.book.title)}</h3>
      <div class="rec-author">${esc(pick.book.author)}</div>
      <div>${tagsHtml}</div>
    </div>`;

  const actions = document.createElement('div');
  actions.style.marginTop = '12px';
  actions.style.display = 'flex';
  actions.style.gap = '8px';

  if (pick.source === 'library') {
    const openBtn = document.createElement('a');
    openBtn.className = 'btn btn-primary btn-small';
    openBtn.href = `#/book/${pick.book.id}`;
    openBtn.textContent = 'Open this book';
    actions.appendChild(openBtn);
  } else {
    const addBtn = document.createElement('button');
    addBtn.className = 'btn btn-primary btn-small';
    addBtn.textContent = 'Add to my list';
    addBtn.addEventListener('click', () => {
      const d = loadData();
      addBookToLibrary(d, pick.book);
      saveData(d);
      const b = findBook(d, pick.book.title, pick.book.author);
      actions.innerHTML = '';
      const openBtn = document.createElement('a');
      openBtn.className = 'btn btn-primary btn-small';
      openBtn.href = `#/book/${b.id}`;
      openBtn.textContent = 'Added ✓ — open it';
      actions.appendChild(openBtn);
    });
    actions.appendChild(addBtn);
  }

  const tryAgainBtn = document.createElement('button');
  tryAgainBtn.className = 'btn btn-ghost btn-small';
  tryAgainBtn.textContent = 'Try another';
  tryAgainBtn.addEventListener('click', () => {
    const d = loadData();
    renderPickResult(slotEl, pickForMe(d));
  });
  actions.appendChild(tryAgainBtn);

  wrap.appendChild(actions);
  slotEl.appendChild(wrap);
}

/* ---------- pages ---------- */

function renderHome(app) {
  const data = loadData();
  app.innerHTML = '';

  const title = document.createElement('h1');
  title.textContent = 'Welcome back';
  app.appendChild(title);

  const currentlyReading = data.books.filter((b) => b.status === 'reading');
  const continueBook = currentlyReading.find((b) => b.id === data.lastVisitedBookId) || currentlyReading[0];
  if (continueBook) {
    const pct = continueBook.totalPages
      ? Math.min(100, Math.round((continueBook.currentPage / continueBook.totalPages) * 100))
      : null;
    const card = document.createElement('div');
    card.className = 'card continue-card';
    card.innerHTML = `<div>
      <div class="card-title">Continue reading</div>
      <h3>${esc(continueBook.title)}</h3>
      <div class="book-author">${esc(continueBook.author)}</div>
      ${pct !== null
        ? `<div class="progress-bar-track" style="margin-top:8px;width:180px;"><div class="progress-bar-fill" style="width:${pct}%"></div></div><div style="font-size:0.78rem;color:var(--ink-soft);margin-top:4px;">${pct}% done</div>`
        : ''}
    </div>`;
    const btn = document.createElement('a');
    btn.className = 'btn btn-primary';
    btn.href = `#/book/${continueBook.id}`;
    btn.textContent = 'Open';
    card.appendChild(btn);
    app.appendChild(card);
  }

  const wisdomCard = document.createElement('div');
  wisdomCard.className = 'card';
  wisdomCard.innerHTML = '<div class="card-title">Today\'s Wisdom</div><div id="wisdom-slot"></div>';
  app.appendChild(wisdomCard);
  renderTodaysWisdom(wisdomCard.querySelector('#wisdom-slot'));

  const streaks = computeStreaks(data.logs);
  const streakCard = document.createElement('div');
  streakCard.className = 'card';
  streakCard.innerHTML = `<div class="card-title">Your streak</div>
    <div class="stat-grid" style="margin-bottom:14px;">
      <div class="stat-box"><div class="stat-num">${streaks.current}</div><div class="stat-label">day streak</div></div>
      <div class="stat-box"><div class="stat-num">${streaks.longest}</div><div class="stat-label">longest streak</div></div>
    </div>
    <div class="heatmap-wrap"><div class="heatmap" id="heatmap"></div></div>
    <div id="log-today-slot" style="margin-top:16px;"></div>`;
  app.appendChild(streakCard);
  renderHeatmapInto(streakCard.querySelector('#heatmap'), data.logs);
  renderLogTodayWidget(streakCard.querySelector('#log-today-slot'));

  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  const quoteCard = document.createElement('div');
  quoteCard.className = 'card quote-card';
  quoteCard.innerHTML = `“${esc(quote.text)}”<span class="quote-author">— ${esc(quote.author)}</span>`;
  app.appendChild(quoteCard);
}

function renderLibrary(app) {
  const data = loadData();
  app.innerHTML = '';

  const counts = countStatuses(data.books);
  const header = document.createElement('div');
  header.className = 'library-header';
  header.innerHTML = `<h1>Library</h1>
    <div class="stats-row">
      <span><b>${data.books.length}</b> total</span>
      <span><b>${counts.reading}</b> reading</span>
      <span><b>${counts.want}</b> want to read</span>
      <span><b>${counts.paused}</b> paused</span>
      <span><b>${counts.finished}</b> finished</span>
    </div>`;
  app.appendChild(header);

  renderBookSearch(app, { title: 'Add a book', onAdded: () => renderLibrary(app) });

  const manualToggle = document.createElement('a');
  manualToggle.href = '#';
  manualToggle.style.fontSize = '0.85rem';
  manualToggle.style.display = 'inline-block';
  manualToggle.style.marginTop = '-10px';
  manualToggle.style.marginBottom = '20px';
  manualToggle.textContent = "Can't find it? Add it manually";
  app.appendChild(manualToggle);

  const form = document.createElement('form');
  form.className = 'add-book-form';
  form.style.display = 'none';
  form.innerHTML = `
    <input name="title" placeholder="Title" required />
    <input name="author" placeholder="Author" required />
    <input name="genre" placeholder="Genre (optional)" />
    <button type="submit" class="btn btn-primary">Add book</button>
  `;
  manualToggle.addEventListener('click', (e) => {
    e.preventDefault();
    form.style.display = form.style.display === 'none' ? 'grid' : 'none';
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const bookTitle = fd.get('title').toString().trim();
    const author = fd.get('author').toString().trim();
    const genre = fd.get('genre').toString().trim();
    if (!bookTitle || !author) return;
    const d = loadData();
    addBookToLibrary(d, { title: bookTitle, author, genre });
    saveData(d);
    renderLibrary(app);
  });
  app.appendChild(form);

  if (data.books.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'No books yet — add your first one above, or visit Discover for ideas.';
    app.appendChild(empty);
    return;
  }

  const statusOrder = { reading: 0, want: 1, paused: 2, finished: 3 };
  const sortedBooks = data.books.slice().sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

  const grid = document.createElement('div');
  grid.className = 'book-grid';
  sortedBooks.forEach((book) => {
    const pct = book.totalPages ? Math.min(100, Math.round((book.currentPage / book.totalPages) * 100)) : null;
    const card = document.createElement('a');
    card.className = 'book-card';
    card.href = `#/book/${book.id}`;
    card.innerHTML = `<h3>${esc(book.title)}</h3>
      <div class="book-author">${esc(book.author)}</div>
      <div class="book-meta">
        <span class="badge status-${book.status}">${esc(statusLabel(book.status))}</span>
        ${book.genre ? `<span class="badge">${esc(book.genre)}</span>` : ''}
      </div>
      ${book.recommendedBy ? `<div style="font-size:0.78rem;color:var(--ink-soft);margin-top:6px;">Recommended by ${esc(book.recommendedBy)}</div>` : ''}
      ${pct !== null ? `<div class="progress-bar-track" style="margin-top:10px;"><div class="progress-bar-fill" style="width:${pct}%"></div></div>` : ''}`;
    grid.appendChild(card);
  });
  app.appendChild(grid);
}

async function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
}

function renderContextLinksCard(app, book) {
  const card = document.createElement('div');
  card.className = 'card';
  const q1 = encodeURIComponent(`${book.title} ${book.author}`);
  const q2 = encodeURIComponent(`${book.title} summary explained SparkNotes`);
  const q3 = encodeURIComponent(`${book.title} ${book.author} historical and philosophical context themes explained`);
  card.innerHTML = `<div class="card-title">Need more context?</div>
    <div class="muted-text" style="padding:0;font-size:0.82rem;margin-bottom:10px;">One-click searches, opened in a new tab — real background from real humans, not a guess.</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <a class="btn btn-ghost btn-small" href="https://en.wikipedia.org/w/index.php?search=${q1}" target="_blank" rel="noopener noreferrer">Look it up on Wikipedia</a>
      <a class="btn btn-ghost btn-small" href="https://www.google.com/search?q=${q2}" target="_blank" rel="noopener noreferrer">Find a plain-English summary</a>
      <a class="btn btn-ghost btn-small" href="https://www.google.com/search?q=${q3}" target="_blank" rel="noopener noreferrer">Find historical & philosophical context</a>
      <button class="btn btn-primary btn-small" id="ask-claude-btn">Ask Claude about this book</button>
    </div>
    <div id="ask-claude-status" style="margin-top:10px;"></div>`;
  app.appendChild(card);

  card.querySelector('#ask-claude-btn').addEventListener('click', async () => {
    const prompt = `I'm reading "${book.title}" by ${book.author}. There's a passage I'm finding hard to understand:\n\n[paste the passage here]\n\nCan you help me understand what's going on, and explain any difficult language or ideas in plain terms?`;
    const copied = await copyToClipboard(prompt);
    window.open('https://claude.ai', '_blank', 'noopener,noreferrer');
    const statusEl = card.querySelector('#ask-claude-status');
    if (copied) {
      statusEl.innerHTML = '<p class="muted-text" style="padding:0;">✓ A starter question is copied to your clipboard — paste it into Claude and drop in the passage you\'re stuck on.</p>';
    } else {
      statusEl.innerHTML = `<p class="muted-text" style="padding:0;margin-bottom:6px;">Couldn't copy automatically — here's your starter question to copy yourself:</p>
        <textarea readonly style="width:100%;min-height:90px;" onclick="this.select()">${esc(prompt)}</textarea>`;
    }
  });
}

function renderBookPage(app, bookId) {
  const initial = loadData();
  const book = initial.books.find((b) => b.id === bookId);
  app.innerHTML = '';
  if (!book) {
    app.innerHTML = '<a class="back-link" href="#/library">← Back to Library</a><div class="empty-state">Book not found.</div>';
    return;
  }
  initial.lastVisitedBookId = bookId;
  saveData(initial);

  const back = document.createElement('a');
  back.className = 'back-link';
  back.href = '#/library';
  back.textContent = '← Back to Library';
  app.appendChild(back);

  const header = document.createElement('div');
  header.className = 'book-header';
  header.innerHTML = `<div>
      <h1>${esc(book.title)}</h1>
      <div class="book-author">${esc(book.author)}</div>
      <div class="book-header-meta">
        <select id="status-select">
          <option value="want">Want to read</option>
          <option value="reading">Reading</option>
          <option value="paused">Paused</option>
          <option value="finished">Finished</option>
        </select>
        ${book.genre ? `<span class="badge">${esc(book.genre)}</span>` : ''}
      </div>
      ${book.recommendedBy ? `<div style="font-size:0.85rem;color:var(--ink-soft);margin-top:6px;">Recommended by ${esc(book.recommendedBy)}</div>` : ''}
    </div>
    <button id="delete-book-btn" class="btn btn-danger btn-small">Delete</button>`;
  app.appendChild(header);

  const statusSelect = header.querySelector('#status-select');
  statusSelect.value = book.status;
  statusSelect.addEventListener('change', (e) => {
    const d = loadData();
    const b = d.books.find((x) => x.id === bookId);
    if (!b) return;
    const newStatus = e.target.value;
    if (newStatus === 'reading' && !b.dateStarted) b.dateStarted = new Date().toISOString();
    if (newStatus === 'finished' && !b.dateFinished) b.dateFinished = new Date().toISOString();
    if (newStatus === 'paused') {
      b.pausedAt = new Date().toISOString();
      b.pauseReason = null;
    }
    b.status = newStatus;
    saveData(d);
    renderBookPage(app, bookId);
  });

  if (book.status === 'paused' && !book.pauseReason) {
    const pauseCard = document.createElement('div');
    pauseCard.className = 'card notice';
    pauseCard.innerHTML = `<div style="margin-bottom:10px;">It's okay to set a book aside — no shame here. Want to note why, just for your own patterns? Totally optional.</div>
      <div id="pause-reason-chips" style="display:flex;gap:8px;flex-wrap:wrap;"></div>`;
    app.appendChild(pauseCard);
    const chipsEl = pauseCard.querySelector('#pause-reason-chips');
    PAUSE_REASONS.forEach((r) => {
      const chip = document.createElement('button');
      chip.className = 'chip';
      chip.textContent = r.label;
      chip.addEventListener('click', () => {
        const d = loadData();
        const b = d.books.find((x) => x.id === bookId);
        if (!b) return;
        b.pauseReason = r.key;
        saveData(d);
        renderBookPage(app, bookId);
      });
      chipsEl.appendChild(chip);
    });
    const skipBtn = document.createElement('button');
    skipBtn.className = 'btn btn-ghost btn-small';
    skipBtn.textContent = 'Skip';
    skipBtn.style.marginTop = '10px';
    skipBtn.addEventListener('click', () => pauseCard.remove());
    pauseCard.appendChild(skipBtn);
  }

  header.querySelector('#delete-book-btn').addEventListener('click', () => {
    if (!confirm(`Delete "${book.title}" and its notes? This can't be undone.`)) return;
    const d = loadData();
    d.books = d.books.filter((x) => x.id !== bookId);
    if (d.lastVisitedBookId === bookId) d.lastVisitedBookId = null;
    saveData(d);
    location.hash = '#/library';
  });

  renderContextLinksCard(app, book);

  const progCard = document.createElement('div');
  progCard.className = 'card';
  const pct = book.totalPages ? Math.min(100, Math.round((book.currentPage / book.totalPages) * 100)) : 0;
  progCard.innerHTML = `<div class="card-title">Progress</div>
    <div class="progress-bar-track" style="margin-bottom:10px;"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
    <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:center;">
      <label>Current page <input type="number" min="0" id="current-page-input" value="${book.currentPage || 0}" style="width:90px;" /></label>
      <label>Total pages <input type="number" min="0" id="total-pages-input" value="${book.totalPages || ''}" style="width:90px;" /></label>
      <button class="btn btn-primary btn-small" id="save-progress-btn">Save progress</button>
    </div>`;
  app.appendChild(progCard);
  progCard.querySelector('#save-progress-btn').addEventListener('click', () => {
    const d = loadData();
    const b = d.books.find((x) => x.id === bookId);
    if (!b) return;
    const newCurrent = parseInt(progCard.querySelector('#current-page-input').value, 10) || 0;
    const totalRaw = progCard.querySelector('#total-pages-input').value;
    const newTotal = totalRaw ? parseInt(totalRaw, 10) || null : null;
    const delta = Math.max(0, newCurrent - (b.currentPage || 0));
    b.currentPage = newCurrent;
    b.totalPages = newTotal;
    if (delta > 0) addLog(d, { pages: delta });
    saveData(d);
    renderBookPage(app, bookId);
  });

  renderVocabularyCard(app, bookId);

  if (book.status === 'finished') {
    const rateCard = document.createElement('div');
    rateCard.className = 'card';
    rateCard.innerHTML = '<div class="card-title">Your rating</div><div id="star-row"></div>';
    app.appendChild(rateCard);
    const starRow = rateCard.querySelector('#star-row');
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('button');
      star.className = 'btn btn-ghost btn-small';
      star.style.fontSize = '1.1rem';
      star.textContent = i <= (book.rating || 0) ? '★' : '☆';
      star.addEventListener('click', () => {
        const d = loadData();
        const b = d.books.find((x) => x.id === bookId);
        if (!b) return;
        b.rating = i;
        saveData(d);
        renderBookPage(app, bookId);
      });
      starRow.appendChild(star);
    }
  }

  if (book.status !== 'want') {
    const reflectCard = document.createElement('div');
    reflectCard.className = 'card';
    reflectCard.innerHTML = `<div class="card-title">Reflect on this book</div>
      <div class="muted-text" style="margin-bottom:8px;font-size:0.82rem;padding:0;">Tag the themes this book actually deals with, and the questions below get a lot more specific.</div>
      <div id="theme-chips" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;"></div>
      <div id="reflect-questions"></div>
      <button class="btn btn-ghost btn-small" id="shuffle-questions-btn" style="margin-top:6px;">Show different questions</button>`;
    app.appendChild(reflectCard);

    const chipContainer = reflectCard.querySelector('#theme-chips');
    const qContainer = reflectCard.querySelector('#reflect-questions');

    function getFreshBook() {
      const d = loadData();
      return d.books.find((x) => x.id === bookId);
    }

    function renderThemeChips() {
      const b = getFreshBook();
      chipContainer.innerHTML = '';
      Object.keys(THEME_LABELS).forEach((theme) => {
        const chip = document.createElement('button');
        chip.className = 'chip' + (b.themes.includes(theme) ? ' active' : '');
        chip.textContent = THEME_LABELS[theme];
        chip.addEventListener('click', () => {
          const d = loadData();
          const bb = d.books.find((x) => x.id === bookId);
          if (!bb) return;
          const i = bb.themes.indexOf(theme);
          if (i === -1) bb.themes.push(theme);
          else bb.themes.splice(i, 1);
          saveData(d);
          renderThemeChips();
          renderQuestionList(getQuestionsForBook(bb, 3));
        });
        chipContainer.appendChild(chip);
      });
    }

    function renderQuestionList(questions) {
      qContainer.innerHTML = '';
      if (!questions.length) {
        const done = document.createElement('div');
        done.className = 'muted-text';
        done.style.padding = '0';
        done.textContent =
          "You've answered every question I've got for these themes — nice work. Tag another theme, or keep writing freeform notes below.";
        qContainer.appendChild(done);
        return;
      }
      questions.forEach((q) => {
        const qWrap = document.createElement('div');
        qWrap.style.marginBottom = '12px';
        qWrap.style.paddingBottom = '12px';
        qWrap.style.borderBottom = '1px solid var(--border)';

        const qText = document.createElement('div');
        qText.style.marginBottom = '6px';
        qText.textContent = q.text;
        qWrap.appendChild(qText);

        const answerBtn = document.createElement('button');
        answerBtn.className = 'btn btn-ghost btn-small';
        answerBtn.textContent = 'Answer this';
        qWrap.appendChild(answerBtn);

        const answerBox = document.createElement('div');
        answerBox.style.display = 'none';
        answerBox.style.marginTop = '8px';
        const textarea = document.createElement('textarea');
        textarea.style.width = '100%';
        textarea.style.minHeight = '60px';
        const saveBtn = document.createElement('button');
        saveBtn.className = 'btn btn-primary btn-small';
        saveBtn.textContent = 'Save reflection';
        saveBtn.style.marginTop = '6px';
        answerBox.appendChild(textarea);
        answerBox.appendChild(document.createElement('br'));
        answerBox.appendChild(saveBtn);
        qWrap.appendChild(answerBox);

        answerBtn.addEventListener('click', () => {
          answerBox.style.display = answerBox.style.display === 'none' ? 'block' : 'none';
        });
        saveBtn.addEventListener('click', () => {
          const val = textarea.value.trim();
          if (!val) return;
          const d = loadData();
          const b = d.books.find((x) => x.id === bookId);
          if (!b) return;
          b.notes.push({ id: uid(), text: `Q: ${q.text}\n\nA: ${val}`, ts: Date.now(), questionId: q.id });
          saveData(d);
          answerBox.style.display = 'none';
          textarea.value = '';
          answerBtn.textContent = 'Answered ✓ — answer again';
          refreshNotes();
        });

        qContainer.appendChild(qWrap);
      });
    }

    renderThemeChips();
    renderQuestionList(getQuestionsForBook(getFreshBook(), 3));
    reflectCard.querySelector('#shuffle-questions-btn').addEventListener('click', () => {
      renderQuestionList(getQuestionsForBook(getFreshBook(), 3));
    });
  }

  const notesCard = document.createElement('div');
  notesCard.className = 'card';
  notesCard.innerHTML = `<div class="card-title">Your notes</div>
    <textarea id="note-input" placeholder="Jot down a thought, a quote, a reaction…" style="width:100%;min-height:70px;"></textarea>
    <div style="margin-top:8px;"><button class="btn btn-primary btn-small" id="add-note-btn">Save note</button></div>
    <div id="notes-list" style="margin-top:16px;"></div>`;
  app.appendChild(notesCard);

  function refreshNotes() {
    const d = loadData();
    const b = d.books.find((x) => x.id === bookId);
    const list = notesCard.querySelector('#notes-list');
    list.innerHTML = '';
    if (!b || !b.notes.length) {
      const empty = document.createElement('div');
      empty.className = 'muted-text';
      empty.textContent = 'No notes yet.';
      list.appendChild(empty);
      return;
    }
    b.notes.slice().reverse().forEach((n) => {
      const entry = document.createElement('div');
      entry.className = 'note-entry';
      const dateEl = document.createElement('div');
      dateEl.className = 'note-date';
      dateEl.textContent = new Date(n.ts).toLocaleString();
      const textEl = document.createElement('div');
      textEl.className = 'note-text';
      textEl.textContent = n.text;
      entry.appendChild(dateEl);
      entry.appendChild(textEl);
      list.appendChild(entry);
    });
  }
  notesCard.querySelector('#add-note-btn').addEventListener('click', () => {
    const textarea = notesCard.querySelector('#note-input');
    const val = textarea.value.trim();
    if (!val) return;
    const d = loadData();
    const b = d.books.find((x) => x.id === bookId);
    if (!b) return;
    b.notes.push({ id: uid(), text: val, ts: Date.now() });
    saveData(d);
    textarea.value = '';
    refreshNotes();
  });
  refreshNotes();
}

function renderGlossaryCard(app) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<div class="card-title">Philosophy & Literature Glossary</div>
    <div class="muted-text" style="padding:0;font-size:0.82rem;margin-bottom:10px;">Free, always here — no internet needed. For when a term like "the absurd" or "bildungsroman" is doing a lot of unexplained work in what you're reading.</div>
    <input type="text" id="glossary-search" placeholder="Search terms…" style="width:100%;margin-bottom:14px;" />
    <div id="glossary-list"></div>`;
  app.appendChild(card);

  const input = card.querySelector('#glossary-search');
  const listEl = card.querySelector('#glossary-list');

  function renderList(filter) {
    const f = filter.trim().toLowerCase();
    const filtered = GLOSSARY_TERMS.filter(
      (t) => !f || t.term.toLowerCase().includes(f) || t.definition.toLowerCase().includes(f)
    );
    listEl.innerHTML = '';
    if (!filtered.length) {
      const p = document.createElement('p');
      p.className = 'muted-text';
      p.style.padding = '0';
      p.textContent = 'No matching terms.';
      listEl.appendChild(p);
      return;
    }
    filtered.forEach((t) => {
      const row = document.createElement('div');
      row.style.padding = '8px 0';
      row.style.borderBottom = '1px solid var(--border)';
      const wikiUrl = `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(t.term)}`;
      row.innerHTML = `<a href="${wikiUrl}" target="_blank" rel="noopener noreferrer" style="font-weight:bold;text-decoration:none;border-bottom:1px dotted var(--amber-dark);">${esc(t.term)} ↗</a><div style="color:var(--ink-soft);font-size:0.9rem;margin-top:2px;">${esc(t.definition)}</div>`;
      listEl.appendChild(row);
    });
  }

  input.addEventListener('input', () => renderList(input.value));
  renderList('');
}

function renderDiscover(app) {
  app.innerHTML = '';
  const h = document.createElement('h1');
  h.textContent = 'Discover';
  app.appendChild(h);

  const sub = document.createElement('p');
  sub.style.color = 'var(--ink-soft)';
  sub.textContent = "Too many choices is half of what kills a reading habit. Here's a shortcut.";
  app.appendChild(sub);

  renderBookSearch(app);

  const pickCard = document.createElement('div');
  pickCard.className = 'card pick-card';
  pickCard.innerHTML = `<div class="card-title">Feeling stuck?</div>
    <div id="pick-slot"><button class="btn btn-primary" id="pick-btn">Pick something for me</button></div>`;
  app.appendChild(pickCard);
  pickCard.querySelector('#pick-btn').addEventListener('click', () => {
    const d = loadData();
    renderPickResult(pickCard.querySelector('#pick-slot'), pickForMe(d));
  });

  renderConnectionCard(app);

  const listCard = document.createElement('div');
  listCard.className = 'card';
  listCard.innerHTML = `<div class="card-title">Starter shelf</div>
    <div id="tag-filters" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;"></div>
    <div class="book-grid" id="starter-grid"></div>`;
  app.appendChild(listCard);

  let activeTag = null;
  const tagFilters = listCard.querySelector('#tag-filters');
  Object.keys(TAG_LABELS).forEach((tag) => {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.textContent = TAG_LABELS[tag];
    chip.addEventListener('click', () => {
      activeTag = activeTag === tag ? null : tag;
      Array.from(tagFilters.children).forEach((c) => c.classList.remove('active'));
      if (activeTag) chip.classList.add('active');
      renderStarterGrid();
    });
    tagFilters.appendChild(chip);
  });

  const grid = listCard.querySelector('#starter-grid');
  function renderStarterGrid() {
    const d = loadData();
    grid.innerHTML = '';
    const filtered = STARTER_BOOKS.filter((b) => !activeTag || b.tags.includes(activeTag));
    filtered.forEach((b) => {
      const already = bookExists(d, b.title, b.author);
      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `<div class="preview-trigger" style="cursor:pointer;">
          <div class="starter-cover" style="width:100%;height:120px;border-radius:8px;margin-bottom:8px;background:linear-gradient(160deg, var(--amber), var(--terracotta));display:flex;align-items:center;justify-content:center;font-size:1.6rem;color:#fff8ec;">📖</div>
          <h3>${esc(b.title)}</h3>
          <div class="book-author">${esc(b.author)}</div>
          <div class="book-meta">${b.tags.map((t) => `<span class="badge">${esc(TAG_LABELS[t])}</span>`).join('')}</div>
          <div class="book-desc muted-text" style="padding:0;font-size:0.82rem;margin-top:6px;">Loading description…</div>
        </div>`;
      const btn = document.createElement('button');
      btn.className = 'btn btn-small ' + (already ? 'btn-ghost' : 'btn-primary');
      btn.style.marginTop = '10px';
      btn.textContent = already ? 'In your library' : 'Add to want-to-read';
      btn.disabled = already;
      btn.addEventListener('click', () => {
        const dd = loadData();
        addBookToLibrary(dd, b);
        saveData(dd);
        renderStarterGrid();
      });
      card.appendChild(btn);
      grid.appendChild(card);

      const triggerEl = card.querySelector('.preview-trigger');
      const coverEl = card.querySelector('.starter-cover');
      const descEl = card.querySelector('.book-desc');

      getStarterOpenLibraryInfo(b)
        .then((info) => {
          if (!info) {
            descEl.textContent = 'No description available.';
            return;
          }
          if (info.coverId) {
            coverEl.outerHTML = `<img src="https://covers.openlibrary.org/b/id/${info.coverId}-M.jpg" alt="" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:8px;" />`;
          }
          if (info.workKey) {
            triggerEl.addEventListener('click', () => {
              previewCache[info.workKey] = {
                title: b.title,
                author: b.author,
                year: info.year,
                coverId: info.coverId,
                workKey: info.workKey,
              };
              location.hash = `#/preview/${encodeURIComponent(info.workKey)}`;
            });
            fetchWorkDescription(info.workKey)
              .then((desc) => {
                if (desc) descEl.textContent = desc;
                else descEl.remove();
              })
              .catch(() => descEl.remove());
          } else {
            descEl.remove();
          }
        })
        .catch(() => descEl.remove());
    });
  }
  renderStarterGrid();

  renderGlossaryCard(app);
}

function renderProgress(app) {
  const data = loadData();
  app.innerHTML = '';
  const h = document.createElement('h1');
  h.textContent = 'Progress';
  app.appendChild(h);

  const streaks = computeStreaks(data.logs);
  const counts = countStatuses(data.books);
  const finishedThisYear = countFinishedThisYear(data.books);

  renderBadgeShelf(app, data);

  const statCard = document.createElement('div');
  statCard.className = 'card';
  statCard.innerHTML = `<div class="stat-grid">
    <div class="stat-box"><div class="stat-num">${data.books.length}</div><div class="stat-label">total books</div></div>
    <div class="stat-box"><div class="stat-num">${counts.finished}</div><div class="stat-label">finished</div></div>
    <div class="stat-box"><div class="stat-num">${counts.reading}</div><div class="stat-label">reading now</div></div>
    <div class="stat-box"><div class="stat-num">${streaks.current}</div><div class="stat-label">day streak</div></div>
    <div class="stat-box"><div class="stat-num">${streaks.longest}</div><div class="stat-label">longest streak</div></div>
    <div class="stat-box"><div class="stat-num">${countVocabulary(data.books)}</div><div class="stat-label">words learned</div></div>
  </div>`;
  app.appendChild(statCard);

  const goalPct = data.goal.targetBooksPerYear
    ? Math.min(100, Math.round((finishedThisYear / data.goal.targetBooksPerYear) * 100))
    : 0;
  const goalCard = document.createElement('div');
  goalCard.className = 'card';
  goalCard.innerHTML = `<div class="card-title">This year's goal</div>
    <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
      <span>${finishedThisYear} of ${data.goal.targetBooksPerYear} books (${goalPct}%)</span>
      <button class="btn btn-ghost btn-small" id="edit-goal-btn">Edit goal</button>
    </div>
    <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${goalPct}%"></div></div>
    <div id="goal-edit-slot"></div>`;
  app.appendChild(goalCard);
  goalCard.querySelector('#edit-goal-btn').addEventListener('click', () => {
    const slot = goalCard.querySelector('#goal-edit-slot');
    slot.innerHTML = `<div style="margin-top:10px;display:flex;gap:8px;">
      <input type="number" min="1" id="goal-input" value="${data.goal.targetBooksPerYear}" style="width:100px;" />
      <button class="btn btn-primary btn-small" id="save-goal-btn">Save</button>
    </div>`;
    slot.querySelector('#save-goal-btn').addEventListener('click', () => {
      const val = parseInt(slot.querySelector('#goal-input').value, 10);
      if (!val || val < 1) return;
      const d = loadData();
      d.goal.targetBooksPerYear = val;
      saveData(d);
      renderProgress(app);
    });
  });

  const monthCounts = countFinishedByMonth(data.books);
  const monthNames = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  const maxCount = Math.max(1, ...monthCounts);
  const chartCard = document.createElement('div');
  chartCard.className = 'card';
  chartCard.innerHTML = `<div class="card-title">Books finished this year, by month</div>
    <div class="bar-chart">
      ${monthCounts
        .map(
          (c, i) => `<div class="bar-col">
          <div class="bar" style="height:${(c / maxCount) * 100}%;" title="${c}"></div>
          <div class="bar-label">${monthNames[i]}</div>
        </div>`
        )
        .join('')}
    </div>`;
  app.appendChild(chartCard);

  const genreCounts = countByGenre(data.books.filter((b) => b.status === 'finished'));
  const genreCard = document.createElement('div');
  genreCard.className = 'card';
  if (Object.keys(genreCounts).length === 0) {
    genreCard.innerHTML =
      '<div class="card-title">Genres you finish</div><p class="muted-text">Finish a book to start seeing your patterns here.</p>';
  } else {
    const sorted = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);
    genreCard.innerHTML =
      '<div class="card-title">Genres you finish</div>' +
      sorted
        .map(
          ([g, c]) =>
            `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);"><span>${esc(g)}</span><span>${c}</span></div>`
        )
        .join('');
  }
  app.appendChild(genreCard);

  const pauseCounts = countByPauseReason(data.books);
  if (Object.keys(pauseCounts).length > 0) {
    const pauseLabel = (key) => (PAUSE_REASONS.find((r) => r.key === key) || {}).label || key;
    const pauseCard = document.createElement('div');
    pauseCard.className = 'card';
    const sortedPause = Object.entries(pauseCounts).sort((a, b) => b[1] - a[1]);
    pauseCard.innerHTML =
      '<div class="card-title">Why books get paused for you</div>' +
      sortedPause
        .map(
          ([k, c]) =>
            `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);"><span>${esc(pauseLabel(k))}</span><span>${c}</span></div>`
        )
        .join('');
    app.appendChild(pauseCard);
  }

  const themeCounts = countByTheme(data.books);
  const themeCard = document.createElement('div');
  themeCard.className = 'card';
  if (Object.keys(themeCounts).length === 0) {
    themeCard.innerHTML =
      '<div class="card-title">Themes you keep coming back to</div><p class="muted-text">Tag a book with a theme on its page (under "Reflect on this book") to start seeing this.</p>';
  } else {
    const sortedThemes = Object.entries(themeCounts).sort((a, b) => b[1] - a[1]);
    themeCard.innerHTML =
      '<div class="card-title">Themes you keep coming back to</div>' +
      sortedThemes
        .map(
          ([t, c]) =>
            `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);"><span>${esc(THEME_LABELS[t] || t)}</span><span>${c}</span></div>`
        )
        .join('');
  }
  app.appendChild(themeCard);
}

/* ---------- router ---------- */

function route() {
  const hash = location.hash || '#/';
  const app = document.getElementById('app');

  document.querySelectorAll('.nav a').forEach((a) => {
    const r = a.dataset.route;
    const active = hash === r || (r === '#/library' && hash.startsWith('#/book/'));
    a.classList.toggle('active', active);
  });

  if (hash.startsWith('#/book/')) {
    renderBookPage(app, decodeURIComponent(hash.slice('#/book/'.length)));
  } else if (hash.startsWith('#/preview/')) {
    renderPreviewPage(app, hash.slice('#/preview/'.length));
  } else if (hash === '#/library') {
    renderLibrary(app);
  } else if (hash === '#/discover') {
    renderDiscover(app);
  } else if (hash === '#/progress') {
    renderProgress(app);
  } else {
    renderHome(app);
  }
}

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', route);
window.addEventListener('DOMContentLoaded', () => {
  const syncLink = document.getElementById('syncLink');
  if (syncLink) {
    syncLink.addEventListener('click', (e) => {
      e.preventDefault();
      promptForSyncCode();
    });
  }
  initCloudSync();
});
