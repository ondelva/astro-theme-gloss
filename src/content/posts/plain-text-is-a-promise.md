---
title: 'Plain text is a promise'
description: 'Why I keep twenty years of writing in files any machine can open, and what I gave up to do it.'
date: 2025-05-20
note: 'the long one, sorry'
tags: [writing, tools, software]
---

In 2009 I wrote a few hundred pages in a program that no longer exists. I did not think of it as a risk. The program was good, it had a name I liked, and it saved my work in a format that I assumed was just a detail.

Last winter I tried to open those pages. The program is gone, the company is gone, and the files are 41 megabytes of something that my current machine describes, with some tenderness, as "data." I recovered about sixty percent of the text by running a script over the raw bytes and picking out anything that looked like a sentence. The rest is lost, and I have made a kind of peace with that, but the peace is the reason for this essay.

## What a format promises

A file format is a promise about the future. When you save something, you are saying that someone, a person or a program, will be able to read it later. Most formats keep this promise for a while, and then the person who maintained the format loses interest, or the company changes its mind about what it wants to be.

Plain text makes a smaller promise and keeps it better. The promise is: a character is a character. There is no structure to misunderstand and no version to be incompatible with. I have opened text files from 1996 on a machine that did not exist in 1996, and nothing at all happened, which is exactly what I want to happen.

I do not mean that plain text is superior in every way. It has no italics, no images, no layout. It cannot tell you where a paragraph begins unless you leave a blank line. For most of what I write, which is sentences in a row, these absences cost me almost nothing. For the rest, I have learned to live with a few conventions.

## The conventions I use

I write in Markdown, which is plain text with a handful of agreed habits: a pound sign for a heading, an asterisk on either side of a word you want to lean on. I am aware that Markdown is not quite plain text. It is plain text with manners.[^1]

The test I apply is simple. If the tool disappeared tomorrow, could I read the file? With Markdown, yes. A heading would look like a line starting with a pound sign. A list would look like a list. The file would be a little less pretty and entirely whole.

The folder structure is similarly dull. One folder per year. Inside, files named by date and a few words: `2025-05-20-plain-text.md`. No subfolders deeper than that. I have tried cleverer schemes, and every one of them eventually asked me to remember a rule I had not followed in March.

## An old idea about finding things

I think often about how people managed this before computers. They kept commonplace books,[^1] which were notebooks where you copied passages you wanted to keep, and the real trouble was finding anything again. John Locke wrote up an indexing method for them in the 1680s: you took the first letter of a keyword and its first following vowel, and used that pair to place the entry in an alphabetical index at the back.[^2]

I like this because the system is so small. It asks almost nothing of you, and it works when the book is closed on a train. My version of it is a file called `index.md` that I update about once a month, and which I regard as optional. Search handles most of it. But when search fails, I still reach for the index, and I find the thing, and I feel faintly like a seventeenth century gentleman, which is not a bad feeling for a Tuesday.

## What I gave up

This is the part that I think gets skipped when people write about plain text, so I will be specific.

I gave up good-looking drafts. When I write in a plain editor, nothing about the page tells me whether it is working. A word processor will show me a handsome title and a nice font, and for a moment my terrible paragraph feels published. Plain text withholds this. It is, I admit, a colder feeling.

I gave up easy collaboration. When an editor wants to comment on my work, I cannot hand her a link and watch her annotate. I send a file, she sends one back, and I diff them. She has been patient about this. She once described my workflow as "charming," in the voice you would use about a person who still writes cheques.

I gave up convenience in general. There is no phone app that does exactly what I want, and no single place where everything is synced and tidy. I run a small script to copy my notes to two other drives. It takes four seconds. It has failed twice in six years, both times because I had unplugged something.

> The thing I want from a tool is not that it be clever. It is that it still be there, and still be mine, in ten years.[^3]

I copied that sentence from my own notebook, dated March of last year, written after the afternoon with the 2009 files. It is not elegant, and I have thought about editing it. I have left it as it is.

## When it goes wrong

Plain text is not immune to my own habits. In 2022 I renamed about four hundred files in one evening, to fix an inconsistency that bothered nobody but me, and a typo in the script gave a third of them the same name. Each new file replaced the last. I lost an afternoon of work and two weeks of a draft.

That one was my fault, and it cost me because I had no history. Now the whole folder lives in a version control repository, which is a fancy way of saying I can ask what a file looked like last Thursday. It is the one piece of real machinery in my setup. I did not want it, and I stopped arguing about it after the evening with the typo.

The lesson I took is narrower than "back up your files," though please do that. It is that a format can be safe and a person can still be careless. The promise of plain text covers the bytes. It does not cover me.

## A year of the folder

For the sake of honesty, here is what a year of this looks like in practice. In 2024 I wrote 212 files. Forty-one became essays. The rest are notes, abandoned openings, lists of titles I did not use, and one long angry letter to a landlord that I never sent and am rather proud of.

Total size of the folder: 3.1 megabytes. That is smaller than a single photograph from my phone. I can copy a decade of my writing onto a memory stick that I got free at a conference, and I have, and it is in a drawer with the spare keys.

I find the smallness comforting. A lot of modern software asks you to believe that your work is heavy, that it needs infrastructure, that it must be hosted somewhere with a login. Mine weighs about as much as a good sandwich, and it will still open when I am old and the sandwich is long forgotten.

## What it does for the writing

I did not expect plain text to change how I wrote, and I will not claim a large effect. But there is something.

When the only thing on the screen is the text, I tend to write the next sentence rather than adjust the last one. There is nothing to adjust. No ruler, no style panel, no little ==blinking indicator of how many words== I have written today. I used to think of that count as motivation. I now think of it as a small, steady insult, since it measures the one thing about writing that is easiest to fake.

My drafts are now rougher on the way in and cleaner on the way out. I make a mess in the file, I go for a walk, and when I return, the mess is just a file. There is no other state to interpret. That consistency, the sameness of the thing from one day to the next, is a kind of comfort, and I would pay for it even if it were the only benefit.

## Two small rules

Over the years I have collected a couple of rules that keep the folder from rotting. I mention them because they are the opposite of clever.

The first is that every file begins with the date on its first line, typed by hand. Filenames get renamed, and file dates change when you copy a folder to a new drive. A date written inside the text goes wherever the text goes. I have saved myself more than once by trusting that line over the timestamp the machine assigned.

The second is that I never put anything in a file that I would not mind seeing on a screen at an airport. This is partly about privacy and mostly about tone. If the file might be read by a stranger, or by me in thirty years, I tend to write it as though I mean it. The result is that my notes to myself are slightly more polite than my notes to anyone else, which says something unflattering and probably true.

## A practical suggestion

If you are thinking about moving your writing to plain text, I would suggest not doing it all at once. Pick one thing, perhaps the notes you take at work, and keep them in a folder of text files for a month. Do not install anything. Use whatever editor already came with your computer.

At the end of the month, ask yourself two questions. Did you lose anything? Did you miss anything? The first answer will probably be no. The second is more interesting, and you should write it down on paper, where you will be able to read it in ten years.

I should say that I still lose things. Last month I could not find a recipe I had saved, and it took twenty minutes before I remembered I had put it in the notebook after all. The notebook, you will recall, has no search. I found it by looking, which took longer, and was rather nice.

The 2009 pages are still in a folder called `old`, along with the script and the sixty percent. I do not expect to recover the rest. Every so often I open the folder, look at it, and close it again. It is the most honest reminder I own of what a promise is worth when nobody is left to keep it.

[^1]: Readable before it is converted into anything. That is why it survives. Its older cousin is the [commonplace book](https://en.wikipedia.org/wiki/Commonplace_book).

[^2]: Locke described the scheme in a short text published in French in 1685, and later in English. It lets you file under a letter and a vowel, so "Faith" goes under F and a, and "Study" under S and u. It looks arbitrary and works anyway.

[^3]: I did add the comma after "clever." Everything else is as I wrote it, which tells you something about how much I trust my afternoon moods.
