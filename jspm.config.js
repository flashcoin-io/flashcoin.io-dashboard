SystemJS.config({
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/"
  },
  typescriptOptions: {
    "reactNamespace": "tsx",
    "jsx": "react",
    "module": "system",
    "target": "es5",
    "noImplicitAny": false,
    "sourceMap": false,
    "allowJs": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "plugin-typescript": "github:frankwallis/plugin-typescript@5.0.1",
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.12",
      "plugin-traceur": "npm:systemjs-plugin-traceur@0.0.2",
      "clean-css": "npm:clean-css@3.4.18"
    },
    "packages": {
      "github:frankwallis/plugin-typescript@5.0.1": {
        "map": {
          "typescript": "npm:typescript@2.0.0"
        }
      },
      "npm:systemjs-plugin-traceur@0.0.2": {
        "map": {
          "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.95",
          "traceur": "github:jmcriffey/bower-traceur@0.0.95"
        }
      },
      "npm:clean-css@3.4.18": {
        "map": {
          "source-map": "npm:source-map@0.4.4",
          "commander": "npm:commander@2.8.1"
        }
      },
      "npm:source-map@0.4.4": {
        "map": {
          "amdefine": "npm:amdefine@1.0.0"
        }
      },
      "npm:commander@2.8.1": {
        "map": {
          "graceful-readlink": "npm:graceful-readlink@1.0.1"
        }
      }
    }
  },
  transpiler: "plugin-typescript",
  meta: {
    "*.ts": {
      "loader": "plugin-typescript"
    }
  },
  packages: {
    "src": {
      "defaultExtension": "js"
    },
    "src/model": {
      "defaultExtension": "ts",
      "meta": {
        "*.ts": {
          "loader": "plugin-typescript"
        }
      }
    },
    "src/components/ts": {
      "defaultExtension": "ts",
      "meta": {
        "*.ts": {
          "loader": "plugin-typescript"
        }
      }
    },
    "src/components/tsx": {
      "defaultExtension": "tsx",
      "meta": {
        "*.tsx": {
          "loader": "plugin-typescript"
        }
      }
    },
    "src/core": {
      "defaultExtension": "tsx",
      "meta": {
        "*.tsx": {
          "loader": "plugin-typescript"
        }
      }
    },
    "assets/lib": {
      "defaultExtension": "js",
      "format": "global"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "github:*/*.json",
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "assert": "npm:jspm-nodelibs-assert@0.2.0",
    "async": "npm:async@2.1.4",
    "bowser": "npm:bowser@1.4.3",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.0",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.0",
    "cluster": "npm:jspm-nodelibs-cluster@0.2.0",
    "constants": "npm:jspm-nodelibs-constants@0.2.0",
    "core-js": "npm:core-js@2.4.1",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.0",
    "css": "github:systemjs/plugin-css@0.1.23",
    "dgram": "npm:jspm-nodelibs-dgram@0.2.0",
    "dns": "npm:jspm-nodelibs-dns@0.2.0",
    "document-register-element": "npm:document-register-element@1.1.1",
    "domain": "npm:jspm-nodelibs-domain@0.2.0",
    "ecc-jsbn": "npm:ecc-jsbn@0.1.1",
    "events": "npm:jspm-nodelibs-events@0.2.0",
    "font-awesome": "npm:font-awesome@4.6.3",
    "fs": "npm:jspm-nodelibs-fs@0.2.0",
    "fsevents": "npm:fsevents@1.0.12",
    "http": "github:jspm/nodelibs-http@0.2.0-alpha",
    "https": "npm:jspm-nodelibs-https@0.2.0",
    "jodid25519": "npm:jodid25519@1.0.2",
    "jquery": "npm:jquery@3.1.0",
    "jsbn": "npm:jsbn@0.1.0",
    "jsdom": "npm:jsdom@7.2.2",
    "machina": "npm:machina@2.0.0",
    "module": "npm:jspm-nodelibs-module@0.2.0",
    "moment": "npm:moment@2.14.1",
    "net": "npm:jspm-nodelibs-net@0.2.0",
    "numeraljs": "npm:numeraljs@1.5.6",
    "os": "npm:jspm-nodelibs-os@0.2.0",
    "path": "npm:jspm-nodelibs-path@0.2.0",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "punycode": "npm:jspm-nodelibs-punycode@0.2.0",
    "querystring": "npm:jspm-nodelibs-querystring@0.2.0",
    "react": "npm:react@15.4.1",
    "react-dom": "npm:react-dom@15.4.1",
    "react-router": "npm:react-router@3.0.0",
    "redux": "npm:redux@3.5.2",
    "redux-thunk": "npm:redux-thunk@2.1.0",
    "riot": "npm:riot@2.5.0",
    "riot-router": "npm:riot-router@0.8.0",
    "scss": "github:KevCJones/plugin-scss@0.2.11",
    "source-map": "npm:source-map@0.2.0",
    "stream": "npm:jspm-nodelibs-stream@0.2.0",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.0",
    "tag": "npm:systemjs-riot@1.4.1",
    "text": "github:systemjs/plugin-text@0.0.8",
    "tls": "npm:jspm-nodelibs-tls@0.2.0",
    "tty": "npm:jspm-nodelibs-tty@0.2.0",
    "tweetnacl": "npm:tweetnacl@0.13.3",
    "url": "npm:jspm-nodelibs-url@0.2.0",
    "util": "npm:jspm-nodelibs-util@0.2.0",
    "vm": "npm:jspm-nodelibs-vm@0.2.0",
    "zlib": "npm:jspm-nodelibs-zlib@0.2.0"
  },
  packages: {
    "npm:systemjs-riot@1.4.1": {
      "map": {
        "riot-compiler": "npm:riot-compiler@2.5.2"
      }
    },
    "npm:crypto-browserify@3.11.0": {
      "map": {
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "inherits": "npm:inherits@2.0.3",
        "pbkdf2": "npm:pbkdf2@3.0.9",
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "browserify-sign": "npm:browserify-sign@4.0.0",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "randombytes": "npm:randombytes@2.0.3",
        "public-encrypt": "npm:public-encrypt@4.0.0"
      }
    },
    "npm:create-hash@1.1.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.3",
        "ripemd160": "npm:ripemd160@1.0.1",
        "sha.js": "npm:sha.js@2.4.8"
      }
    },
    "npm:browserify-sign@4.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "inherits": "npm:inherits@2.0.3",
        "elliptic": "npm:elliptic@6.3.2",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "bn.js": "npm:bn.js@4.11.6",
        "parse-asn1": "npm:parse-asn1@5.0.0"
      }
    },
    "npm:create-hmac@1.1.4": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "randombytes": "npm:randombytes@2.0.3",
        "bn.js": "npm:bn.js@4.11.6",
        "miller-rabin": "npm:miller-rabin@4.0.0"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "randombytes": "npm:randombytes@2.0.3",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "bn.js": "npm:bn.js@4.11.6",
        "parse-asn1": "npm:parse-asn1@5.0.0"
      }
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "elliptic": "npm:elliptic@6.3.2",
        "bn.js": "npm:bn.js@4.11.6"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "browserify-des": "npm:browserify-des@1.0.0",
        "browserify-aes": "npm:browserify-aes@1.0.6"
      }
    },
    "npm:browserify-aes@1.0.6": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "inherits": "npm:inherits@2.0.3",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "cipher-base": "npm:cipher-base@1.0.3",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.3",
        "des.js": "npm:des.js@1.0.0"
      }
    },
    "npm:evp_bytestokey@1.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "randombytes": "npm:randombytes@2.0.3",
        "bn.js": "npm:bn.js@4.11.6"
      }
    },
    "npm:parse-asn1@5.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.9",
        "asn1.js": "npm:asn1.js@4.9.0"
      }
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "brorand": "npm:brorand@1.0.6"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:hash.js@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.2.2"
      }
    },
    "npm:readable-stream@2.1.4": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@1.0.0",
        "buffer-shims": "npm:buffer-shims@1.0.0",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "core-util-is": "npm:core-util-is@1.0.2",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:riot@2.5.0": {
      "map": {
        "riot-compiler": "npm:riot-compiler@2.5.2",
        "riot-tmpl": "npm:riot-tmpl@2.4.0",
        "riot-cli": "npm:riot-cli@2.6.1",
        "riot-observable": "npm:riot-observable@2.5.0",
        "riot-route": "npm:riot-route@2.5.0",
        "simple-html-tokenizer": "npm:simple-html-tokenizer@0.2.5",
        "simple-dom": "npm:simple-dom@0.3.0"
      }
    },
    "npm:riot-cli@2.6.1": {
      "map": {
        "riot-compiler": "npm:riot-compiler@2.5.2",
        "chalk": "npm:chalk@1.1.3",
        "chokidar": "npm:chokidar@1.6.0",
        "co": "npm:co@4.6.0",
        "optionator": "npm:optionator@0.8.1",
        "shelljs": "npm:shelljs@0.7.3",
        "rollup": "npm:rollup@0.32.4"
      }
    },
    "npm:chalk@1.1.3": {
      "map": {
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
        "supports-color": "npm:supports-color@2.0.0",
        "has-ansi": "npm:has-ansi@2.0.0",
        "ansi-styles": "npm:ansi-styles@2.2.1"
      }
    },
    "npm:chokidar@1.6.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "is-glob": "npm:is-glob@2.0.1",
        "path-is-absolute": "npm:path-is-absolute@1.0.0",
        "glob-parent": "npm:glob-parent@2.0.0",
        "readdirp": "npm:readdirp@2.1.0",
        "async-each": "npm:async-each@1.0.0",
        "anymatch": "npm:anymatch@1.3.0",
        "is-binary-path": "npm:is-binary-path@1.0.1"
      }
    },
    "npm:glob-parent@2.0.0": {
      "map": {
        "is-glob": "npm:is-glob@2.0.1"
      }
    },
    "npm:optionator@0.8.1": {
      "map": {
        "wordwrap": "npm:wordwrap@1.0.0",
        "deep-is": "npm:deep-is@0.1.3",
        "type-check": "npm:type-check@0.3.2",
        "fast-levenshtein": "npm:fast-levenshtein@1.1.4",
        "prelude-ls": "npm:prelude-ls@1.1.2",
        "levn": "npm:levn@0.3.0"
      }
    },
    "npm:glob@7.0.5": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "path-is-absolute": "npm:path-is-absolute@1.0.0",
        "fs.realpath": "npm:fs.realpath@1.0.0",
        "inflight": "npm:inflight@1.0.5",
        "minimatch": "npm:minimatch@3.0.3",
        "once": "npm:once@1.3.3"
      }
    },
    "npm:type-check@0.3.2": {
      "map": {
        "prelude-ls": "npm:prelude-ls@1.1.2"
      }
    },
    "npm:levn@0.3.0": {
      "map": {
        "prelude-ls": "npm:prelude-ls@1.1.2",
        "type-check": "npm:type-check@0.3.2"
      }
    },
    "npm:rollup@0.32.4": {
      "map": {
        "source-map-support": "npm:source-map-support@0.4.2"
      }
    },
    "npm:strip-ansi@3.0.1": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.0.0"
      }
    },
    "npm:has-ansi@2.0.0": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.0.0"
      }
    },
    "npm:is-glob@2.0.1": {
      "map": {
        "is-extglob": "npm:is-extglob@1.0.0"
      }
    },
    "npm:rechoir@0.6.2": {
      "map": {
        "resolve": "npm:resolve@1.1.7"
      }
    },
    "npm:readdirp@2.1.0": {
      "map": {
        "graceful-fs": "npm:graceful-fs@4.1.5",
        "minimatch": "npm:minimatch@3.0.3",
        "readable-stream": "npm:readable-stream@2.1.4",
        "set-immediate-shim": "npm:set-immediate-shim@1.0.1"
      }
    },
    "npm:inflight@1.0.5": {
      "map": {
        "once": "npm:once@1.3.3",
        "wrappy": "npm:wrappy@1.0.2"
      }
    },
    "npm:anymatch@1.3.0": {
      "map": {
        "arrify": "npm:arrify@1.0.1",
        "micromatch": "npm:micromatch@2.3.11"
      }
    },
    "npm:is-binary-path@1.0.1": {
      "map": {
        "binary-extensions": "npm:binary-extensions@1.5.0"
      }
    },
    "npm:fsevents@1.0.12": {
      "map": {
        "nan": "npm:nan@2.4.0",
        "node-pre-gyp": "npm:node-pre-gyp@0.6.29"
      }
    },
    "npm:once@1.3.3": {
      "map": {
        "wrappy": "npm:wrappy@1.0.2"
      }
    },
    "npm:source-map@0.1.32": {
      "map": {
        "amdefine": "npm:amdefine@1.0.0"
      }
    },
    "npm:node-pre-gyp@0.6.29": {
      "map": {
        "tar": "npm:tar@2.2.1",
        "nopt": "npm:nopt@3.0.6",
        "semver": "npm:semver@5.2.0",
        "rimraf": "npm:rimraf@2.5.4",
        "mkdirp": "npm:mkdirp@0.5.1",
        "rc": "npm:rc@1.1.6",
        "npmlog": "npm:npmlog@3.1.2",
        "tar-pack": "npm:tar-pack@3.1.4",
        "request": "npm:request@2.74.0"
      }
    },
    "npm:parse-glob@3.0.4": {
      "map": {
        "is-extglob": "npm:is-extglob@1.0.0",
        "is-glob": "npm:is-glob@2.0.1",
        "glob-base": "npm:glob-base@0.3.0",
        "is-dotfile": "npm:is-dotfile@1.0.2"
      }
    },
    "npm:extglob@0.3.2": {
      "map": {
        "is-extglob": "npm:is-extglob@1.0.0"
      }
    },
    "npm:tar@2.2.1": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "block-stream": "npm:block-stream@0.0.9",
        "fstream": "npm:fstream@1.0.10"
      }
    },
    "npm:tar-pack@3.1.4": {
      "map": {
        "once": "npm:once@1.3.3",
        "readable-stream": "npm:readable-stream@2.1.4",
        "rimraf": "npm:rimraf@2.5.4",
        "tar": "npm:tar@2.2.1",
        "uid-number": "npm:uid-number@0.0.6",
        "debug": "npm:debug@2.2.0",
        "fstream": "npm:fstream@1.0.10",
        "fstream-ignore": "npm:fstream-ignore@1.0.5"
      }
    },
    "npm:glob-base@0.3.0": {
      "map": {
        "glob-parent": "npm:glob-parent@2.0.0",
        "is-glob": "npm:is-glob@2.0.1"
      }
    },
    "npm:braces@1.8.5": {
      "map": {
        "repeat-element": "npm:repeat-element@1.1.2",
        "preserve": "npm:preserve@0.2.0",
        "expand-range": "npm:expand-range@1.8.2"
      }
    },
    "npm:regex-cache@0.4.3": {
      "map": {
        "is-primitive": "npm:is-primitive@2.0.0",
        "is-equal-shallow": "npm:is-equal-shallow@0.1.3"
      }
    },
    "npm:arr-diff@2.0.0": {
      "map": {
        "arr-flatten": "npm:arr-flatten@1.0.1"
      }
    },
    "npm:expand-brackets@0.1.5": {
      "map": {
        "is-posix-bracket": "npm:is-posix-bracket@0.1.1"
      }
    },
    "npm:object.omit@2.0.0": {
      "map": {
        "is-extendable": "npm:is-extendable@0.1.1",
        "for-own": "npm:for-own@0.1.4"
      }
    },
    "npm:nopt@3.0.6": {
      "map": {
        "abbrev": "npm:abbrev@1.0.9"
      }
    },
    "npm:block-stream@0.0.9": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:mkdirp@0.5.1": {
      "map": {
        "minimist": "npm:minimist@0.0.8"
      }
    },
    "npm:rc@1.1.6": {
      "map": {
        "minimist": "npm:minimist@1.2.0",
        "deep-extend": "npm:deep-extend@0.4.1",
        "ini": "npm:ini@1.3.4",
        "strip-json-comments": "npm:strip-json-comments@1.0.4"
      }
    },
    "npm:is-equal-shallow@0.1.3": {
      "map": {
        "is-primitive": "npm:is-primitive@2.0.0"
      }
    },
    "npm:npmlog@3.1.2": {
      "map": {
        "set-blocking": "npm:set-blocking@2.0.0",
        "console-control-strings": "npm:console-control-strings@1.1.0",
        "are-we-there-yet": "npm:are-we-there-yet@1.1.2",
        "gauge": "npm:gauge@2.6.0"
      }
    },
    "npm:are-we-there-yet@1.1.2": {
      "map": {
        "readable-stream": "npm:readable-stream@1.1.14",
        "delegates": "npm:delegates@1.0.0"
      }
    },
    "npm:readable-stream@1.1.14": {
      "map": {
        "isarray": "npm:isarray@0.0.1",
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "string_decoder": "npm:string_decoder@0.10.31",
        "stream-browserify": "npm:stream-browserify@1.0.0"
      }
    },
    "npm:gauge@2.6.0": {
      "map": {
        "console-control-strings": "npm:console-control-strings@1.1.0",
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "object-assign": "npm:object-assign@4.1.0",
        "has-color": "npm:has-color@0.1.7",
        "string-width": "npm:string-width@1.0.1",
        "aproba": "npm:aproba@1.0.4",
        "has-unicode": "npm:has-unicode@2.0.1",
        "wide-align": "npm:wide-align@1.1.0",
        "signal-exit": "npm:signal-exit@3.0.0"
      }
    },
    "npm:fstream@1.0.10": {
      "map": {
        "graceful-fs": "npm:graceful-fs@4.1.5",
        "inherits": "npm:inherits@2.0.1",
        "mkdirp": "npm:mkdirp@0.5.1",
        "rimraf": "npm:rimraf@2.5.4"
      }
    },
    "npm:fstream-ignore@1.0.5": {
      "map": {
        "fstream": "npm:fstream@1.0.10",
        "inherits": "npm:inherits@2.0.1",
        "minimatch": "npm:minimatch@3.0.3"
      }
    },
    "npm:bl@1.1.2": {
      "map": {
        "readable-stream": "npm:readable-stream@2.0.6"
      }
    },
    "npm:readable-stream@2.0.6": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@1.0.0",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "string_decoder": "npm:string_decoder@0.10.31",
        "util-deprecate": "npm:util-deprecate@1.0.2"
      }
    },
    "npm:form-data@1.0.0-rc4": {
      "map": {
        "mime-types": "npm:mime-types@2.1.11",
        "combined-stream": "npm:combined-stream@1.0.5",
        "async": "npm:async@1.5.2"
      }
    },
    "npm:har-validator@2.0.6": {
      "map": {
        "chalk": "npm:chalk@1.1.3",
        "is-my-json-valid": "npm:is-my-json-valid@2.13.1",
        "pinkie-promise": "npm:pinkie-promise@2.0.1",
        "commander": "npm:commander@2.9.0"
      }
    },
    "npm:http-signature@1.1.1": {
      "map": {
        "jsprim": "npm:jsprim@1.3.0",
        "assert-plus": "npm:assert-plus@0.2.0",
        "sshpk": "npm:sshpk@1.9.2"
      }
    },
    "npm:expand-range@1.8.2": {
      "map": {
        "fill-range": "npm:fill-range@2.2.3"
      }
    },
    "npm:fill-range@2.2.3": {
      "map": {
        "repeat-element": "npm:repeat-element@1.1.2",
        "is-number": "npm:is-number@2.1.0",
        "randomatic": "npm:randomatic@1.1.5",
        "isobject": "npm:isobject@2.1.0",
        "repeat-string": "npm:repeat-string@1.5.4"
      }
    },
    "npm:for-own@0.1.4": {
      "map": {
        "for-in": "npm:for-in@0.1.5"
      }
    },
    "npm:mime-types@2.1.11": {
      "map": {
        "mime-db": "npm:mime-db@1.23.0"
      }
    },
    "npm:stream-browserify@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@1.1.14"
      }
    },
    "npm:debug@2.2.0": {
      "map": {
        "ms": "npm:ms@0.7.1"
      }
    },
    "npm:string-width@1.0.1": {
      "map": {
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "code-point-at": "npm:code-point-at@1.0.0",
        "is-fullwidth-code-point": "npm:is-fullwidth-code-point@1.0.0"
      }
    },
    "npm:hawk@3.1.3": {
      "map": {
        "hoek": "npm:hoek@2.16.3",
        "cryptiles": "npm:cryptiles@2.0.5",
        "sntp": "npm:sntp@1.0.9",
        "boom": "npm:boom@2.10.1"
      }
    },
    "npm:wide-align@1.1.0": {
      "map": {
        "string-width": "npm:string-width@1.0.1"
      }
    },
    "github:jspm/nodelibs-http@0.2.0-alpha": {
      "map": {
        "http-browserify": "npm:stream-http@2.5.0"
      }
    },
    "npm:combined-stream@1.0.5": {
      "map": {
        "delayed-stream": "npm:delayed-stream@1.0.0"
      }
    },
    "npm:sntp@1.0.9": {
      "map": {
        "hoek": "npm:hoek@2.16.3"
      }
    },
    "npm:cryptiles@2.0.5": {
      "map": {
        "boom": "npm:boom@2.10.1"
      }
    },
    "npm:boom@2.10.1": {
      "map": {
        "hoek": "npm:hoek@2.16.3"
      }
    },
    "npm:jsprim@1.3.0": {
      "map": {
        "json-schema": "npm:json-schema@0.2.2",
        "verror": "npm:verror@1.3.6",
        "extsprintf": "npm:extsprintf@1.0.2"
      }
    },
    "npm:ecc-jsbn@0.1.1": {
      "map": {
        "jsbn": "npm:jsbn@0.1.0"
      }
    },
    "npm:is-number@2.1.0": {
      "map": {
        "kind-of": "npm:kind-of@3.0.4"
      }
    },
    "npm:verror@1.3.6": {
      "map": {
        "extsprintf": "npm:extsprintf@1.0.2"
      }
    },
    "npm:getpass@0.1.6": {
      "map": {
        "assert-plus": "npm:assert-plus@1.0.0"
      }
    },
    "npm:dashdash@1.14.0": {
      "map": {
        "assert-plus": "npm:assert-plus@1.0.0"
      }
    },
    "npm:randomatic@1.1.5": {
      "map": {
        "is-number": "npm:is-number@2.1.0",
        "kind-of": "npm:kind-of@3.0.4"
      }
    },
    "npm:jodid25519@1.0.2": {
      "map": {
        "jsbn": "npm:jsbn@0.1.0"
      }
    },
    "npm:isobject@2.1.0": {
      "map": {
        "isarray": "npm:isarray@1.0.0"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "readable-stream": "npm:readable-stream@2.2.2",
        "pako": "npm:pako@0.2.9"
      }
    },
    "npm:is-my-json-valid@2.13.1": {
      "map": {
        "xtend": "npm:xtend@4.0.1",
        "generate-object-property": "npm:generate-object-property@1.2.0",
        "generate-function": "npm:generate-function@2.0.0",
        "jsonpointer": "npm:jsonpointer@2.0.0"
      }
    },
    "npm:pinkie-promise@2.0.1": {
      "map": {
        "pinkie": "npm:pinkie@2.0.4"
      }
    },
    "npm:commander@2.9.0": {
      "map": {
        "graceful-readlink": "npm:graceful-readlink@1.0.1"
      }
    },
    "npm:code-point-at@1.0.0": {
      "map": {
        "number-is-nan": "npm:number-is-nan@1.0.0"
      }
    },
    "npm:is-fullwidth-code-point@1.0.0": {
      "map": {
        "number-is-nan": "npm:number-is-nan@1.0.0"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:generate-object-property@1.2.0": {
      "map": {
        "is-property": "npm:is-property@1.0.2"
      }
    },
    "npm:redux@3.5.2": {
      "map": {
        "lodash-es": "npm:lodash-es@4.13.1",
        "symbol-observable": "npm:symbol-observable@0.2.4",
        "loose-envify": "npm:loose-envify@1.2.0",
        "lodash": "npm:lodash@4.13.1"
      }
    },
    "npm:loose-envify@1.2.0": {
      "map": {
        "js-tokens": "npm:js-tokens@1.0.3"
      }
    },
    "npm:font-awesome@4.6.3": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.23"
      }
    },
    "npm:micromatch@2.3.11": {
      "map": {
        "is-glob": "npm:is-glob@2.0.1",
        "filename-regex": "npm:filename-regex@2.0.0",
        "braces": "npm:braces@1.8.5",
        "array-unique": "npm:array-unique@0.2.1",
        "parse-glob": "npm:parse-glob@3.0.4",
        "is-extglob": "npm:is-extglob@1.0.0",
        "expand-brackets": "npm:expand-brackets@0.1.5",
        "arr-diff": "npm:arr-diff@2.0.0",
        "kind-of": "npm:kind-of@3.0.4",
        "object.omit": "npm:object.omit@2.0.0",
        "extglob": "npm:extglob@0.3.2",
        "normalize-path": "npm:normalize-path@2.0.1",
        "regex-cache": "npm:regex-cache@0.4.3"
      }
    },
    "npm:rimraf@2.5.4": {
      "map": {
        "glob": "npm:glob@7.0.5"
      }
    },
    "npm:source-map-support@0.4.2": {
      "map": {
        "source-map": "npm:source-map@0.1.32"
      }
    },
    "npm:brace-expansion@1.1.6": {
      "map": {
        "concat-map": "npm:concat-map@0.0.1",
        "balanced-match": "npm:balanced-match@0.4.2"
      }
    },
    "npm:request@2.74.0": {
      "map": {
        "aws4": "npm:aws4@1.4.1",
        "forever-agent": "npm:forever-agent@0.6.1",
        "http-signature": "npm:http-signature@1.1.1",
        "combined-stream": "npm:combined-stream@1.0.5",
        "stringstream": "npm:stringstream@0.0.5",
        "mime-types": "npm:mime-types@2.1.11",
        "node-uuid": "npm:node-uuid@1.4.7",
        "json-stringify-safe": "npm:json-stringify-safe@5.0.1",
        "oauth-sign": "npm:oauth-sign@0.8.2",
        "isstream": "npm:isstream@0.1.2",
        "har-validator": "npm:har-validator@2.0.6",
        "is-typedarray": "npm:is-typedarray@1.0.0",
        "bl": "npm:bl@1.1.2",
        "caseless": "npm:caseless@0.11.0",
        "aws-sign2": "npm:aws-sign2@0.6.0",
        "hawk": "npm:hawk@3.1.3",
        "tunnel-agent": "npm:tunnel-agent@0.4.3",
        "extend": "npm:extend@3.0.0",
        "form-data": "npm:form-data@1.0.0-rc4",
        "qs": "npm:qs@6.2.1",
        "tough-cookie": "npm:tough-cookie@2.3.1"
      }
    },
    "npm:jsdom@7.2.2": {
      "map": {
        "abab": "npm:abab@1.0.3",
        "nwmatcher": "npm:nwmatcher@1.3.8",
        "escodegen": "npm:escodegen@1.8.1",
        "parse5": "npm:parse5@1.5.1",
        "symbol-tree": "npm:symbol-tree@3.1.4",
        "sax": "npm:sax@1.2.1",
        "whatwg-url-compat": "npm:whatwg-url-compat@0.6.5",
        "xml-name-validator": "npm:xml-name-validator@2.0.1",
        "cssom": "npm:cssom@0.3.1",
        "webidl-conversions": "npm:webidl-conversions@2.0.1",
        "tough-cookie": "npm:tough-cookie@2.3.1",
        "acorn": "npm:acorn@2.7.0",
        "acorn-globals": "npm:acorn-globals@1.0.9",
        "request": "npm:request@2.74.0",
        "cssstyle": "npm:cssstyle@0.2.36"
      }
    },
    "npm:acorn-globals@1.0.9": {
      "map": {
        "acorn": "npm:acorn@2.7.0"
      }
    },
    "npm:cssstyle@0.2.36": {
      "map": {
        "cssom": "npm:cssom@0.3.1"
      }
    },
    "npm:escodegen@1.8.1": {
      "map": {
        "esutils": "npm:esutils@2.0.2",
        "estraverse": "npm:estraverse@1.9.3",
        "esprima": "npm:esprima@2.7.2",
        "optionator": "npm:optionator@0.8.1"
      }
    },
    "npm:whatwg-url-compat@0.6.5": {
      "map": {
        "tr46": "npm:tr46@0.0.3"
      }
    },
    "npm:source-map@0.2.0": {
      "map": {
        "amdefine": "npm:amdefine@1.0.0"
      }
    },
    "npm:sshpk@1.9.2": {
      "map": {
        "assert-plus": "npm:assert-plus@1.0.0",
        "asn1": "npm:asn1@0.2.3",
        "dashdash": "npm:dashdash@1.14.0",
        "getpass": "npm:getpass@0.1.6"
      }
    },
    "github:KevCJones/plugin-scss@0.2.11": {
      "map": {
        "lodash": "npm:lodash@4.14.2",
        "sass.js": "npm:sass.js@0.9.11",
        "postcss": "npm:postcss@5.1.2",
        "autoprefixer": "npm:autoprefixer@6.4.0",
        "reqwest": "github:ded/reqwest@2.0.5",
        "path": "npm:jspm-nodelibs-path@0.2.0",
        "url": "npm:jspm-nodelibs-url@0.2.0",
        "fs": "npm:jspm-nodelibs-fs@0.2.0"
      }
    },
    "npm:autoprefixer@6.4.0": {
      "map": {
        "postcss": "npm:postcss@5.1.2",
        "num2fraction": "npm:num2fraction@1.2.2",
        "postcss-value-parser": "npm:postcss-value-parser@3.3.0",
        "normalize-range": "npm:normalize-range@0.1.2",
        "browserslist": "npm:browserslist@1.3.5",
        "caniuse-db": "npm:caniuse-db@1.0.30000519"
      }
    },
    "npm:postcss@5.1.2": {
      "map": {
        "supports-color": "npm:supports-color@3.1.2",
        "source-map": "npm:source-map@0.5.6",
        "js-base64": "npm:js-base64@2.1.9"
      }
    },
    "npm:supports-color@3.1.2": {
      "map": {
        "has-flag": "npm:has-flag@1.0.0"
      }
    },
    "npm:browserslist@1.3.5": {
      "map": {
        "caniuse-db": "npm:caniuse-db@1.0.30000519"
      }
    },
    "npm:riot-router@0.8.0": {
      "map": {
        "extend": "npm:extend@3.0.0",
        "riot": "npm:riot@2.5.0"
      }
    },
    "npm:riot-route@2.5.0": {
      "map": {
        "riot-observable": "npm:riot-observable@2.5.0"
      }
    },
    "npm:shelljs@0.7.3": {
      "map": {
        "rechoir": "npm:rechoir@0.6.2",
        "interpret": "npm:interpret@1.0.1",
        "glob": "npm:glob@7.0.5"
      }
    },
    "npm:minimatch@3.0.3": {
      "map": {
        "brace-expansion": "npm:brace-expansion@1.1.6"
      }
    },
    "npm:kind-of@3.0.4": {
      "map": {
        "is-buffer": "npm:is-buffer@1.1.4"
      }
    },
    "npm:machina@2.0.0": {
      "map": {
        "lodash": "npm:lodash@3.10.1"
      }
    },
    "npm:react@15.4.1": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.0",
        "fbjs": "npm:fbjs@0.8.6",
        "object-assign": "npm:object-assign@4.1.0"
      }
    },
    "npm:fbjs@0.8.6": {
      "map": {
        "object-assign": "npm:object-assign@4.1.0",
        "loose-envify": "npm:loose-envify@1.3.0",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "ua-parser-js": "npm:ua-parser-js@0.7.12",
        "promise": "npm:promise@7.1.1",
        "core-js": "npm:core-js@1.2.7"
      }
    },
    "npm:loose-envify@1.3.0": {
      "map": {
        "js-tokens": "npm:js-tokens@2.0.0"
      }
    },
    "npm:promise@7.1.1": {
      "map": {
        "asap": "npm:asap@2.0.5"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "whatwg-fetch": "npm:whatwg-fetch@2.0.1",
        "node-fetch": "npm:node-fetch@1.6.3"
      }
    },
    "npm:node-fetch@1.6.3": {
      "map": {
        "is-stream": "npm:is-stream@1.1.0",
        "encoding": "npm:encoding@0.1.12"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.15"
      }
    },
    "npm:buffer@4.9.1": {
      "map": {
        "base64-js": "npm:base64-js@1.2.0",
        "isarray": "npm:isarray@1.0.0",
        "ieee754": "npm:ieee754@1.1.8"
      }
    },
    "npm:readable-stream@2.2.2": {
      "map": {
        "isarray": "npm:isarray@1.0.0",
        "string_decoder": "npm:string_decoder@0.10.31",
        "inherits": "npm:inherits@2.0.3",
        "buffer-shims": "npm:buffer-shims@1.0.0",
        "core-util-is": "npm:core-util-is@1.0.2",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "util-deprecate": "npm:util-deprecate@1.0.2"
      }
    },
    "npm:pbkdf2@3.0.9": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4"
      }
    },
    "npm:cipher-base@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:sha.js@2.4.8": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:elliptic@6.3.2": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "inherits": "npm:inherits@2.0.3",
        "brorand": "npm:brorand@1.0.6",
        "hash.js": "npm:hash.js@1.0.3"
      }
    },
    "npm:asn1.js@4.9.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:stream-http@2.5.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.2.2",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
        "builtin-status-codes": "npm:builtin-status-codes@2.0.0",
        "xtend": "npm:xtend@4.0.1"
      }
    },
    "npm:react-dom@15.4.1": {
      "map": {
        "object-assign": "npm:object-assign@4.1.0",
        "loose-envify": "npm:loose-envify@1.3.0",
        "fbjs": "npm:fbjs@0.8.6"
      }
    },
    "npm:react-router@3.0.0": {
      "map": {
        "invariant": "npm:invariant@2.2.2",
        "loose-envify": "npm:loose-envify@1.3.0",
        "history": "npm:history@3.2.1",
        "warning": "npm:warning@3.0.0",
        "hoist-non-react-statics": "npm:hoist-non-react-statics@1.2.0"
      }
    },
    "npm:invariant@2.2.2": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.0"
      }
    },
    "npm:history@3.2.1": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.0",
        "invariant": "npm:invariant@2.2.2",
        "warning": "npm:warning@3.0.0",
        "query-string": "npm:query-string@4.2.3"
      }
    },
    "npm:warning@3.0.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.0"
      }
    },
    "npm:query-string@4.2.3": {
      "map": {
        "object-assign": "npm:object-assign@4.1.0",
        "strict-uri-encode": "npm:strict-uri-encode@1.1.0"
      }
    },
    "npm:jspm-nodelibs-url@0.2.0": {
      "map": {
        "url-browserify": "npm:url@0.11.0"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.0": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.0"
      }
    },
    "npm:jspm-nodelibs-domain@0.2.0": {
      "map": {
        "domain-browserify": "npm:domain-browser@1.1.7"
      }
    },
    "npm:jspm-nodelibs-os@0.2.0": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.0": {
      "map": {
        "string_decoder-browserify": "npm:string_decoder@0.10.31"
      }
    },
    "npm:jspm-nodelibs-punycode@0.2.0": {
      "map": {
        "punycode-browserify": "npm:punycode@1.4.1"
      }
    },
    "npm:jspm-nodelibs-zlib@0.2.0": {
      "map": {
        "zlib-browserify": "npm:browserify-zlib@0.1.4"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.0": {
      "map": {
        "buffer-browserify": "npm:buffer@4.9.1"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.0": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:async@2.1.4": {
      "map": {
        "lodash": "npm:lodash@4.17.4"
      }
    }
  }
});
