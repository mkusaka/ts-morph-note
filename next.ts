import * as ts from "typescript";
import * as fs from "fs-extra";

export const createDeclareAst = (identifier: string, literal: string) => [
  ts.createModuleDeclaration(
    undefined,
    undefined,
    ts.createIdentifier("Foo"),
    ts.createModuleDeclaration(
      undefined,
      undefined,
      ts.createIdentifier("Bar"),
      ts.createModuleDeclaration(
        undefined,
        undefined,
        ts.createIdentifier("Baz"),
        ts.createModuleBlock([
          ts.createInterfaceDeclaration(
            undefined,
            undefined,
            ts.createIdentifier("Hoge"),
            undefined,
            undefined,
            [
              ts.createPropertySignature(
                undefined,
                ts.createIdentifier("hoge"),
                undefined,
                ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
                undefined
              ),
              ts.createPropertySignature(
                undefined,
                ts.createIdentifier("foo"),
                undefined,
                ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
                undefined
              ),
            ]
          ),
        ]),
        ts.NodeFlags.NestedNamespace | ts.NodeFlags.Namespace
      ),
      ts.NodeFlags.NestedNamespace | ts.NodeFlags.Namespace
    ),
    ts.NodeFlags.Namespace
  ),
];
const printer = ts.createPrinter();

export function printNode(nodeArray: ts.Node[]) {
  return printer.printList(
    ts.ListFormat.MultiLine,
    ts.createNodeArray(nodeArray),
    ts.createSourceFile("", "", ts.ScriptTarget.ESNext)
  );
}

export function emitFile(distDir: string, filename: string, fileBody: string) {
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }
  fs.writeFileSync(filename, fileBody);
}

function main() {
  const ast = createDeclareAst("foo", "bar");
  const body = printNode(ast);
  console.log(body);
}

main();
