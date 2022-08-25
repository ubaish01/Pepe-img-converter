import PyPDF2

path = 'Server/24.pdf'
path2 = 'server/20.pdf'
pdfs = [path, path2]

writer = PyPDF2.PdfFileWriter()

for pdf in pdfs:
    reader = PyPDF2.PdfFileReader(pdf)
    for i in range(reader.numPages):
        page = reader.getPage(i)
        page.compressContentStreams()
        writer.addPage(page)

with open('Server/out.pdf', 'wb') as f:
    writer.write(f)