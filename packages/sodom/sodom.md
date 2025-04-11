# DOM tree wrangler

EARLY DRAFT

this is an informal presentation of `idom`, a language create and DOM tree and
`sodom` to modify them.

This language is designed to replace the mess with awful HTML syntax and DOM API.

A real motivating example is a wiktionary page.
We want to keep the russian section, replace subsection by 
a details/summary structure and remove the edit sub section.

## idom, sodom 

`idom` is a syntax alternative to html. The i stand for indentation.
`sodom` is a language to modify DOM trees.

Like in yaml,
indentation is not a formating convention but is part of the
syntax.



principles:
  * indentation instead of opening and closing tags
  * borrowing from css syntax

A element tag is representated by '<' and the tagname like :
  <div

Id and class attributes can be written the css way

characters can be usi  

```html
    <div #someid .gap-2 some text with character escaping \<  and \*
```
   
```idom
    <div id="someid" class="gap-2">some text with &lt;
```

```idom
<div #1 <div #2 # line ending starting by '# ' are comments which are ignored
<div #3
```

is equivalent to 

```idom
<div #1 
  <div #2  
<div #3
```
that is to

```html
<div id="1">
  <div id="2">
<div id="3">  
```

In the following, the idom version takes 3 lines but is mode readable
than the oneliner html or the indented multine html

```idom
<details
  <summary A summary
  Some explanation
```

```html
<details><summary>A summary</summary>Some explaination</details>
```

```html
<details>
  <summary>A summary
  </summary>
  Some explaination
</details>
```

## sodom builds on idom



```sodom
    *
$<russianWitk =
    <h2 (#id == "Russian")
    *
    <h2$

==>

```


```sodom
$|divh3 = 
  <div *
    <h3 *
```

A sodom rule is introduced by the keyword `rule`. It has a name.
Its body are a matcher and a replacement separated by `==>` in its own line.

```sodom
rule replace-h3-with-details
    $/ = 
        $|divh3
           $summary=*
        $summarized = <*  
        > $|divh3$
    
    ==>
    
    <details
      <summary
         $m-divh3
      Something small enough to escape casual notice.
    </details>
```sodom



<details>
  <summary>Details</summary>
  Something small enough to escape casual notice.
</details>


A real wiktionary section

```html
<div class="mw-heading mw-heading3">
<div class="mw-heading mw-heading3">
  <h3 id="Pronunciation">Pronunciation</h3>
  <span class="mw-editsection" data-nosnippet=""
    ><span class="mw-editsection-bracket">[</span
    ><a
      href="/w/index.php?title=%D0%BC%D1%83%D0%B6%D0%B5%D1%81%D1%82%D0%B2%D0%B0&amp;action=edit&amp;section=2"
      title="Edit section: Pronunciation"
      ><span>edit</span></a
    ><span class="mw-editsection-bracket">]</span></span
  >
</div>
<ul>
  <li>
    <a
      href="/wiki/Wiktionary:International_Phonetic_Alphabet"
      title="Wiktionary:International Phonetic Alphabet"
      >IPA</a
    ><sup
      >(<a
        href="/wiki/Appendix:Russian_pronunciation"
        title="Appendix:Russian pronunciation"
        >key</a
      >)</sup
    >: <span class="IPA">[ˈmuʐɨstvə]</span>
  </li>
</ul>  
```