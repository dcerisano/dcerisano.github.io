# Everything CLI — Architecture ("Everything App" = Capability-as-Tool Runtime)

## Vision

A mobile app whose entire surface is a **terminal AI agent**. Every capability — filesystem, payments, messages, media, calendar, search, orchestration — is exposed as a **tool on a registry**. The agent loop (LLM + tools + memory) executes user requests by invoking tools in-process. The "app" is the shell; the tools are the features. Third-party tools plug in via the **Model Context Protocol (MCP)**, so the ecosystem is extensible beyond built-in capabilities.

Two native implementations, one architecture:

| | iOS | Android |
|---|---|---|
| Language | Swift (SwiftUI) | Kotlin (Jetpack Compose) |
| Model runtime | Apple Foundation Models | Google Gemini (cloud) + Gemini Nano (on-device) |
| OS capability bridge | App Intents / Shortcuts | Android intents / App Actions |
| Ecosystem hooks | MCP client (stdio + Streamable HTTP) | MCP client (stdio + Streamable HTTP) |
| Filesystem sandbox | App container virtual FS | app-private storage + Storage Access Framework |

---

## SECTION 1 — EVERYTHING CLI FOR iOS

### 1.1 High-level flow

```
User prompt ──> Agent loop (in-process) ──> LanguageModelSession
                                     ├─> Tool calls (built-in registry) ──> execute in-process
                                     ├─> MCP tool calls ──> local/remote MCP server
                                     ├─> App Intents (with user confirmation)
                                     └─> stream deltas → terminal UI
```

### 1.2 Core components

**Agent orchestration engine**
- Background actor running the loop: prompt → generate → if tool call → execute → append result → repeat → final answer
- Session state: conversation history, tool registry, active model (`LanguageModel` protocol)
- **Dynamic Profiles** (iOS 27): swap model/tools/instructions mid-session
- Streams per-token deltas to the UI (matches the opencode `session.next.text.delta` pattern)

**Model layer**
- `LanguageModelSession` + on-device ~3B model (requires Apple Intelligence hardware: iPhone 15 Pro+ / iPad M1+ / Mac)
- `LanguageModel` protocol (WWDC 2026): same API for Claude/Gemini/any conforming provider — hybrid routing: easy → on-device, hard → cloud
- `@Generable` for structured tool-call output + JSON-schema guided generation

**Tool registry** (every capability is a Foundation Models `Tool` — a Swift function)
- `fs`: read / write / list / stat / search / apply_patch → virtual FS backed by app container
- `system`: App Intents → Apple Pay/StoreKit payments, iMessage/share, camera, photos, contacts, calendar, location, Shortcuts
- `agent`: think, plan, summarize, spawn sub-agent, scratchpad
- `meta`: tool discovery, dynamic tool definitions

**Ecosystem hooks — MCP client**
- Loads third-party tools from MCP servers, both transports:
  - **stdio** — local servers (child process or embedded)
  - **Streamable HTTP** — remote servers
- MCP tools exposed to the model namespaced as `mcp.<server>.<tool>` to avoid collisions with built-ins
- Server list configurable per session (Dynamic Profiles can swap the active server set)

**App Intents as OS bridge**
- Apple's sanctioned path: agent invokes intents, each gated by user confirmation
- Anything intents can't reach (raw disk, subprocesses) stays out of scope or is virtualized in-app

**Terminal UI**
- SwiftUI: prompt input, streaming output, tool-call breadcrumbs, scrollback
- The UI *is* the CLI surface

### 1.3 Sandbox reality

- No subprocesses, no shell, no arbitrary FS — enforced by the OS
- Filesystem is an in-app virtual FS (container-backed); "running commands" = invoking functions
- No git/compilers natively — either a WASM interpreter shim (non-JIT, allowed) or handled via an MCP server that runs on a remote/co-hosted machine
- Local stdio MCP servers that need subprocesses cannot run directly in-app; use Streamable HTTP or a co-hosted process

### 1.4 Build constraints

- Requires macOS + Xcode + Apple Developer signing (free tier allows on-device install)
- On-device model requires Apple Intelligence hardware

---

## SECTION 2 — EVERYTHING CLI FOR ANDROID

### 2.1 High-level flow

```
User prompt ──> Agent loop (in-process) ──> Gemini (cloud) / Gemini Nano (on-device)
                                     ├─> Tool calls (built-in registry) ──> execute in-process
                                     ├─> MCP tool calls ──> local/remote MCP server
                                     ├─> Android intents / App Actions (with confirmation)
                                     └─> stream deltas → terminal UI
```

### 2.2 Core components

**Agent orchestration engine**
- Kotlin coroutines + agent loop (same architecture as iOS): prompt → generate → tool call → execute → append → repeat
- Session state: history, tool registry, model client
- Provider abstraction mirroring iOS `LanguageModel` protocol: swap cloud Gemini / Gemini Nano / OpenAI / local Ollama endpoint

**Model layer**
- **Google Gemini API** (cloud, full strength; tool calling + function declarations are first-class)
- **Gemini Nano** (on-device, via Google AI Edge SDK / AICore) for offline simple tasks
- Function-calling is native to Gemini's API: tools declared as `FunctionDeclaration`s

**Tool registry** (capability-as-tool, same philosophy)
- `fs`: read / write / list / search / edit → app-private storage (`Context.filesDir`) or Storage Access Framework (user-picked dirs)
- `system`: Android intents → Google Pay payments, SMS/notifications, share, camera, contacts, calendar, location, App Actions/Shortcuts
- `agent`: think, plan, summarize, sub-agent, scratchpad
- `meta`: tool discovery, dynamic definitions

**Ecosystem hooks — MCP client**
- Same MCP client design as iOS, so the third-party tool ecosystem is identical across platforms:
  - **stdio** — local servers (Android can actually host these, e.g. via a native subprocess or Termux)
  - **Streamable HTTP** — remote servers
- MCP tools namespaced `mcp.<server>.<tool>`; server list configurable per session

**Android intents as OS bridge**
- Agent invokes intents; user confirmation per sensitive capability (payments, SMS)
- App Actions/Shortcuts expose the agent as a system assistant surface

**Terminal UI**
- Jetpack Compose: prompt input, streaming output, tool-call breadcrumbs, scrollback

### 2.3 Sandbox reality

- Android is far more permissive than iOS:
  - Real filesystem access via **Storage Access Framework** (user-picked directories) — can read/write real project folders
  - **Termux + proot** can host a real Linux userland → actual `git`, `node`, `python`, compilers
  - Full subprocess execution is possible inside the app's own process (unlike iOS)
- Consequence: the Android version can be a **true CLI** (real shell tools + local stdio MCP servers), not just a terminal-styled runtime

### 2.4 Build constraints

- Requires Android Studio + SDK (buildable on Linux)
- On-device Gemini Nano needs a compatible device (Pixel 9+ / Samsung flagships); cloud Gemini needs an API key

---

## CROSS-PLATFORM SHARED DESIGN

Applies to both platforms:

1. **Tool protocol** — single interface: `name`, `description`, `inputSchema`, `execute(input) -> output`. Mirrored in Swift and Kotlin.
2. **Agent loop** — same state machine, ported Swift ↔ Kotlin.
3. **MCP client** — shared design: stdio + Streamable HTTP transports, `mcp.<server>.<tool>` namespacing, per-session server list.
4. **Confirmation model** — sensitive tools (payments, send) always pause for explicit user consent.
5. **Terminal surface** — same UX: prompt, streaming output, tool breadcrumbs, scrollback.
6. **Hybrid model routing** — easy tasks → on-device, hard tasks → cloud, behind one provider abstraction.
