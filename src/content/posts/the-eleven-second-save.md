---
title: 'The eleven second save'
description: 'A writing app took eleven seconds to open a file, so I timed the alternative and ended up with a shell one-liner and a quieter afternoon.'
date: 2025-04-03
tags: [software, tools]
---

For about a year, the app I wrote in took eleven seconds to open a document. I know because I timed it, one dull Tuesday, with the stopwatch on the oven.

Eleven seconds is not long. It is exactly long enough to check something else. By the time the file appeared I had read two headlines and forgotten what I came to write.

So I tried the opposite experiment. A folder of text files, any editor that starts before I finish blinking, and one command to find things:

```sh
grep -rn "slow software" ~/notes | head
```

That returns in about a tenth of a second across 2,300 files. I will not pretend that is a better product. It has no preview and no pretty sidebar, and it will never ask how I am feeling.

But the pause was ++never in the file++. It was in everything the app wanted to do before it let me begin: sync, index, check for an update, wonder about my plan. I did not need any of that to write a paragraph.[^1]

Here is the arithmetic I did on that Tuesday. I opened a file perhaps thirty times a day:

$$
30 \times 11\,\text{s} = 330\,\text{s} = 5\tfrac{1}{2}\,\text{minutes}
$$

That is not much time. The cost was every one of those thirty interruptions, each of which cost me the sentence I was holding.

I have since looked into why it was slow. The honest answer is that it was doing a great deal on my behalf, none of which I had asked for, and all of which it was proud of.

I still use the old app for one thing, which is looking at old drawings. It opens in eleven seconds. I have made my peace.

[^1]: The oven timer is also where I discovered my toast takes four minutes. Measuring things is a gateway.
