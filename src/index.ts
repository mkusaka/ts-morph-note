import { Project, StructureKind } from "ts-morph";

const project = new Project();

const sourceFile = project.createSourceFile("foo.ts", {
  statements: [
    {
      kind: StructureKind.Enum,
      name: "MyEnum",
      members: [
        {
          name: "member",
          value: "foo",
        },
      ],
    },
    {
      kind: StructureKind.Class,
      name: "MyClass",
    },
  ],
});

console.log(sourceFile.print());
