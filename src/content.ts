export const chapters = [
  { id: 'hello', name: 'A little hello', hint: 'Just you and me' },
  { id: 'today', name: 'Your special day', hint: 'Twenty-one, with love' },
  { id: 'memories', name: 'Our little album', hint: 'Twelve reasons to pause' },
  { id: 'us', name: 'Four years of us', hint: 'Can we talk for a minute?' },
  { id: 'notes', name: '21 little things', hint: 'Something behind every heart' },
  { id: 'play', name: 'A little detour', hint: 'Find our matching moments' },
  { id: 'letter', name: 'Dear Madhumitha', hint: 'The words I wanted to say' },
  { id: 'wish', name: 'Make a wish', hint: 'This part is all yours' },
]

export const photos = [
  { id: 1, title: 'My favourite kind of together.', tag: 'you + me', alt: 'The two of you sitting together outdoors', note: 'There is something about seeing us in the same frame. I stop looking at everything around us. For a moment, it is just you and me. That is my favourite part of this picture.' },
  { id: 2, title: 'A little closer.', tag: 'just us', alt: 'A close selfie of the two of you at night', note: 'Some photos are less about how they look and more about who is next to you. This is one of those for me. I am glad there is an us to look back at.' },
  { id: 3, title: 'You, so beautifully you.', tag: 'my birthday girl', alt: 'Madhumitha in a teal and rust outfit, standing outside', note: 'I could write a long caption for this. But really, I just want you to see yourself with a little of the fondness I feel when I look at you. You are lovely, Madhu.' },
  { id: 4, title: 'A face I never get tired of.', tag: 'chellam', alt: 'A saved portrait of Madhumitha wearing red', note: 'A photo on a screen cannot be quite the same as having you here. Still, I like having these little pieces of you to come back to. This one deserved a place here too.' },
  { id: 5, title: 'Kept, with a little extra love.', tag: 'little keepsakes', alt: 'A saved portrait of Madhumitha in blue with a flower filter', note: 'Not every memory needs a perfect photograph. Sometimes it is a small saved picture that means something to you. I wanted to keep those here, alongside the rest of our story.' },
  { id: 6, title: 'Even the blurry ones.', tag: 'perfectly imperfect', alt: 'A playful photo of the two of you with pink heart effects', note: 'A little blur, a little silliness, and both of us. I would not trade the imperfect pictures away. They belong in this album just as much as the ones where everything is in focus.' },
  { id: 7, title: 'A small reminder of you.', tag: 'saved for a reason', alt: 'A saved phone screenshot of Madhumitha in a bright green top', note: 'It does not have to be a grand moment to matter. Sometimes a little glimpse of your face is enough. I wanted this page to make room for those small things, too.' },
  { id: 8, title: 'Two of us. One frame.', tag: 'together is nice', alt: 'The two of you leaning into a landscape selfie', note: 'There are so many things I still want to do with you. Big plans, yes, but also ordinary afternoons and more pictures like this. I like the thought of adding to this collection.' },
  { id: 9, title: 'More of this, please.', tag: 'my person', alt: 'A selfie of the two of you standing indoors', note: 'Four years is something I am grateful for. And when I look at us, I do not only think about the time behind us. I think about the moments we still get to make.' },
  { id: 10, title: 'A little sunshine, named Madhu.', tag: 'birthday muse', alt: 'Madhumitha standing in warm sunlight beside leafy branches', note: 'The light is beautiful here. So are you. This is one of those pictures that makes me pause for a second before moving on. You can take your time with it too, birthday girl.' },
  { id: 11, title: 'Hello, favourite face.', tag: 'always you', alt: 'Madhumitha looking into the camera in a blue top', note: 'This whole page started with a simple thought: I want her to feel loved today. Not with a perfect sentence, but with a little time, a little care, and something made only for her.' },
  { id: 12, title: 'One more, because it is you.', tag: 'endlessly fond of you', alt: 'A close portrait of Madhumitha in a black floral outfit', note: 'The album ends here, but I am hoping we will have many more photos to add. Different places, different days, the same two people choosing to make a little room for each other.' },
].map(photo => ({ ...photo, src: `/photos/memory-${String(photo.id).padStart(2, '0')}.webp` }))

export const notes = [
  ['Your smile.', 'It still gets my attention. Even after four years, I can look at a photo of you and find myself smiling back.'],
  ['The ordinary days.', 'I want more of the simple things with you. An unhurried conversation. A walk. A meal with nowhere else we need to be.'],
  ['Being yourself.', 'You do not have to be cheerful or put together all the time to be loved by me. There is room for every version of you.'],
  ['Four years.', 'I do not take that lightly. Thank you for the time, the care, and the part of your life you have shared with me.'],
  ['Your own dreams.', 'I hope this year gives you the space and courage to go after something that is yours. I want to be cheering for you.'],
  ['A little peace.', 'For your twenty-first year, I wish you quieter worries, good rest, and days that do not ask quite so much of you.'],
  ['Still choosing you.', 'Love is in the small choices too. Making time. Paying attention. Trying again. I want to keep making those choices with you.'],
  ['All our photographs.', 'The clear ones, the blurry ones, the ones saved in a hurry. I am glad I have these small pieces of our time together.'],
  ['Your pace.', 'You do not need to have your whole life figured out at twenty-one. I hope you give yourself permission to grow at your own pace.'],
  ['A proper laugh.', 'I hope today has at least one moment that makes you laugh without thinking about anything else. You deserve that kind of lightness.'],
  ['Feeling heard.', 'I want to listen well. Not only when there is a problem to solve, but when you just want to tell me about your day.'],
  ['A place beside me.', 'There is room for your thoughts, your quiet, and the things you are still working out. You do not have to arrive with answers.'],
  ['More little adventures.', 'I want more places we can say we went together. They do not have to be far away. The company is the part I care about.'],
  ['Taking care.', 'Eat something you like today. Take a photo if you feel like it. Let yourself enjoy being celebrated. This day belongs to you.'],
  ['Growing together.', 'We will keep changing. I hope we keep getting curious about each other, instead of assuming we already know everything there is to know.'],
  ['Saying it properly.', 'I love you, Madhumitha. Sometimes the simplest words are the right ones. I wanted to make a little space just for them.'],
  ['Your happiness.', 'I want good things for you, including the ones I have no part in. Your joy matters to me because you matter to me.'],
  ['A little patience.', 'Neither of us has to get everything right. I hope we keep giving each other the kindness and patience it takes to understand.'],
  ['The next photo.', 'Somewhere ahead of us is a picture we have not taken yet. I like thinking that one day it will belong in this album.'],
  ['Today, especially.', 'I hope you feel how much thought went into this little place for you. Every part of it has the same purpose: to make you smile.'],
  ['And this, always.', 'Happy birthday, Pondatii. Four years of loving you, and I am still glad it is you. Let us keep making something good together.'],
]

export const conversations = [
  {
    question: 'First… how is my birthday girl feeling?',
    choices: [
      { text: 'A little excited', reply: 'Good. Keep a little of that excitement for later. There is a cake waiting for you, and a few things I have been wanting to say.' },
      { text: 'Konjam emotional', reply: 'Parava illa, chellam. Take your time. There is no right way to feel today. I just wanted you to have something gentle to come back to.' },
      { text: 'Ready for my surprise', reply: 'Seri, Pondatii. I like that energy. Your only job here is to enjoy being the birthday girl. I have taken care of the rest.' },
    ],
  },
  {
    question: 'If we could borrow a whole afternoon, what would you pick?',
    choices: [
      { text: 'A long walk together', reply: 'A slow walk, no rush, and plenty of time to talk. That sounds like a very good afternoon to me. Let us keep that idea.' },
      { text: 'Food and a lot of talking', reply: 'Something you love to eat, and a conversation that goes on longer than we planned. I could happily make time for that.' },
      { text: 'Just sit beside me', reply: 'I would like that too. We do not need to fill every minute with something. Sometimes being next to you is the whole plan.' },
    ],
  },
  {
    question: 'One last thing. What should twenty-one have more of?',
    choices: [
      { text: 'Little adventures', reply: 'Then here is my wish: more days worth remembering, new places to discover, and the courage to say yes to something you really want.' },
      { text: 'Peace and happiness', reply: 'Then I hope this year feels kinder. More room to breathe, more reasons to smile, and people who make being yourself feel easy.' },
      { text: 'Time for my dreams', reply: 'Then I hope you take yourself seriously this year. Your dreams deserve time and effort. I want to see you proud of what you build.' },
    ],
  },
]

export const letterParagraphs = [
  'Innaiku un birthday. I wanted to do something that would feel like I had sat down beside you and taken the time to say what you mean to me. So here we are: a few photographs, a few small surprises, and these words, just for you.',
  'Four years of us. When I say that, I feel grateful. For all the time we have shared, and for the fact that there is someone I can call my person. You are a real part of my life, Madhumitha, and I do not want that to become something I forget to appreciate.',
  'I love you. Not only in a birthday-message way. I mean that I care about how you are doing, what is on your mind, what you are looking forward to, and what has been weighing on you. I want to keep knowing you as you grow, rather than only loving the version of you I first met.',
  'For us, I want the kind of love that shows up in everyday life. Making time for each other. Speaking with care when something is difficult. Listening before deciding we already understand. I will not pretend I will always get that right, but I want to keep putting in the effort. You are worth that effort to me.',
  'And I want more good days with you. More ordinary afternoons, more photos where we have not quite got the angle right, more conversations that wander off into something funny. There is a lot of life in those little moments. I am looking forward to more of them with you.',
  'Today, I hope you let yourself be celebrated. I hope you eat something you love, laugh properly, and feel proud of the person you are becoming. If this little website makes you smile even once, then I will be happy I made it.',
  'Love you so much, dear. Happy 21st birthday, en alaga chellam. Naalu varusham aachu… innum nee dhaan. I am glad it is you.',
]
