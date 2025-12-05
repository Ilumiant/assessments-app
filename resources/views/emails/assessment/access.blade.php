<!DOCTYPE html>
<html>
<head>
    <title>Acceso a tu assessment</title>
</head>
<body>
    <h1>Hola {{ $assessment->name }}</h1>
    <p>Accede al assessment aquí:</p>
    <a href="{{ url('/assessment/' . $assessment->token) }}">{{ url('/assessment/' . $assessment->token) }}</a>
</body>
</html>
