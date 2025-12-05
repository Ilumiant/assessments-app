<!DOCTYPE html>
<html>
<head>
    <title>Assessment completado</title>
</head>
<body>
    <h1>Assessment completado – {{ $assessment->name }}</h1>
    <p><strong>Email:</strong> {{ $assessment->email }}</p>
    <p><strong>Fecha de finalización:</strong> {{ $assessment->response->completed_at }}</p>
    <h2>Respuestas:</h2>
    <pre>{{ json_encode($assessment->response->responses, JSON_PRETTY_PRINT) }}</pre>
</body>
</html>
