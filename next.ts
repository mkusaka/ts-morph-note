import * as ts from "typescript";
import * as fs from "fs-extra";

export const createDeclareAst = (identifier: string, literal: string) => [
  ts.createVariableStatement(
    undefined,
    ts.createVariableDeclarationList(
      [
        ts.createVariableDeclaration(
          ts.createIdentifier(identifier),
          ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
          ts.createStringLiteral(literal)
        ),
      ],
      ts.NodeFlags.Const
    )
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
