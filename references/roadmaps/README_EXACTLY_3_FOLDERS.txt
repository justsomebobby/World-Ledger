Mass compile rebuilt to contain exactly three folders total.

Rules:
- No nested subfolders.
- Every file is directly inside Tests, Roadmaps, or Old Versions.
- Exact duplicate content is included once by SHA-256.
- Filename collisions with different content are disambiguated using a short SHA-256 suffix.
- The rename map and duplicate log are direct files inside Roadmaps, not a subfolder.
