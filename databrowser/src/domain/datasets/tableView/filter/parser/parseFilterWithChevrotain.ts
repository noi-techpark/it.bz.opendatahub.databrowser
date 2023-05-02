// This class implements a filter parser with chevrotain.
// It is not used in the application, but it is kept here for reference.
// Note that the implementation is not complete, and it is not tested.

// import {
//   createToken,
//   Lexer,
//   CstParser,
//   ParserMethod,
//   CstNode,
// } from 'chevrotain';
// import { RawfilterParser } from '../types';

// // Define the token types
// const And = createToken({ name: 'And', pattern: /and/ });
// const LParen = createToken({ name: 'LParen', pattern: /\(/ });
// const RParen = createToken({ name: 'RParen', pattern: /\)/ });
// const Operator = createToken({
//   name: 'Operator',
//   pattern: /eq|ne|gt|lt|ge|le|isnull|isnotnull/,
// });
// const Identifier = createToken({
//   name: 'Identifier',
//   pattern: /\w+(\.\w+)*/,
// });
// const StringLiteral = createToken({
//   name: 'StringLiteral',
//   pattern: /,\s*(true|false|'(?:[^']|'')*'|"(?:[^"]|"")*")/,
// });
// const Comma = createToken({
//   name: 'Comma',
//   pattern: /,/,
//   longer_alt: StringLiteral,
// });
// const WhiteSpace = createToken({
//   name: 'WhiteSpace',
//   pattern: /\s+/,
//   group: Lexer.SKIPPED,
// });

// const allTokens = [
//   And,
//   LParen,
//   RParen,
//   Comma,
//   Operator,
//   Identifier,
//   StringLiteral,
//   WhiteSpace,
// ];

// // Define the lexer using the tokens
// const lexer = new Lexer(allTokens);

// // Define the parser
// class FilterParser extends CstParser {
//   public filter: ParserMethod<[], CstNode>;
//   private expression: ParserMethod<[], CstNode>;

//   constructor() {
//     super(allTokens);

//     this.filter = this.RULE('filter', () => {
//       this.OR([
//         {
//           ALT: () => {
//             this.CONSUME(And);
//             this.CONSUME(LParen);
//             this.AT_LEAST_ONE_SEP({
//               SEP: Comma,
//               DEF: () => this.SUBRULE(this.expression),
//             });
//             this.CONSUME(RParen);
//           },
//         },
//         {
//           ALT: () => {
//             this.SUBRULE2(this.expression);
//           },
//         },
//       ]);
//     });

//     this.expression = this.RULE('expression', () => {
//       this.CONSUME(Operator);
//       this.CONSUME(LParen);
//       this.CONSUME(Identifier);
//       this.OPTION1(() => {
//         this.CONSUME(StringLiteral);
//       });
//       this.CONSUME(RParen);
//     });

//     this.performSelfAnalysis();
//   }
// }

// // Instantiate the parser
// const parser = new FilterParser();

// // Parsing function
// export const parseFilterWithChevrotain: RawfilterParser = (rawfilter) => {
//   if (rawfilter == null) {
//     return [];
//   }

//   const lexingResult = lexer.tokenize(rawfilter);

//   // Set the input for the parser
//   parser.input = lexingResult.tokens;

//   // Execute the main rule of the parser

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const cst = parser.filter();

//   if (parser.errors.length > 0) {
//     console.error('Parsing errors: ', parser.errors);
//   }

//   // TODO: build filter array from cst
//   return [];
// };
