# slimy-sortable
Slimy to move the list.

## Installation and Usage
Getting Started
```code
<link rel="stylesheet" type="text/css" media="screen,print" href="../dist/slimy-sortable.css" />
<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.0/themes/base/jquery-ui.css" />
<script src="http://code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="http://code.jquery.com/ui/1.12.0/jquery-ui.min.js"></script>
<script type="text/javascript" src="../dist/slimy-sortable.min.js"></script>
```

javascript
```code
$(function() {
    $("#sortable").slimySortable();
});
```
html
```code
<ul id="sortable">
  <li id="item-1">list 1</li>
  <li id="item-2">list 2</li>
  <li id="item-3">list 3</li>
</ul>
```

Options available is equivalent to the sortable plugin jquery ui.
https://jqueryui.com/sortable/
```code
$(function() {
    $("#sortable").slimySortable({
      placeholder: "placeholder"
    });
});
```