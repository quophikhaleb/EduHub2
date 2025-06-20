# Code Citations

## License: unknown
https://github.com/dompham21/boilerplate/tree/7b1a9a26b7643675b196a73efecc44e6c39acd48/routers/auth.js

```
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
```

