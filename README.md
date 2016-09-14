# Sprint Name Generator

Built to support our sprint codenamed `Aromatic Armadillo`

## Installation

`npm install -g pmwheatley/sprint-gen`

## Usage

```
  Usage: sprint-gen [options] <sprint_number>

  Options:

    -h, --help        output usage information
    -n, --number <n>  number of names to generate
    -s, --slack       format output for use with Slack Simple Poll
```

## Example

I want to generate 10 possible names for Sprint number 2

```
$ sprint-gen 2 -n 10
  Bustling Beaver
  Bogus Bobolink
  Blue Bobolink
  Bowed Bison
  Boring Bass
  Bewitched Bunting
  Bleak Bass
  Bite-sized Bear
  Beneficial Bufflehead
  Bulky Bass
$
```

And copy it for pasting directly into Slack (on OSX)

```
$ sprint-gen 2 -n 10 -s | pbcopy
```
