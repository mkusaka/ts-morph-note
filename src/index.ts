import {
  Project,
  StringLiteral,
  Structure,
  StructureKind,
  VariableDeclarationKind,
  ts,
} from "ts-morph";

const project = new Project();

const sourceFile = project.createSourceFile("foo.ts", {
  statements: [
    // {
    //   kind: StructureKind.Namespace,
    //   name: "Bar",
    //   statements: [
    //     {
    //       kind: StructureKind.Namespace,
    //       name: "Foo",
    //       statements: [
    //         {
    //           kind: StructureKind.Interface,
    //           name: "FooBar",
    //           properties: [
    //             {
    //               name: "hoge",
    //               type: "string",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   kind: StructureKind.Function,
    //   name: "myFunction",
    //   isExported: true,
    //   statements: [
    {
      kind: StructureKind.VariableStatement,
      declarationKind: VariableDeclarationKind.Const,
      declarations: [
        {
          name: "aaa",
        },
        {
          kind: StructureKind.VariableDeclaration,
          name: "hoge",
        },
      ],
    },
    //   ],
    // },
  ],
});

const sourceFile2 = project.createSourceFile(
  "hoge",
  `
export function({one, two}: {one: string, two: number}){
  const foo = {one, two}
  return foo;
}
`
);

console.log(sourceFile2.getProject());

// console.log(sourceFile.print());
