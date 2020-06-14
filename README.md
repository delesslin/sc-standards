# SC Standards

### Purpose: Make South Carolina's state standards machine readable by converting to JSON

### Problem: SC's Standards are only available as PDF files

#### Approach

1. Convert .pdf to .docx using SmallPdf.com gui
2. Convert .docx to html using mammoth
   `npm run convert`
3. Traverse HTML structure to construct JSON object `npm start"

<!--  -->
