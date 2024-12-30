<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
</head>
<body class="font-sans antialiased">
<div class="page-wrapper">
    <nav class="navbar page-header">
        <a href="#" class="btn btn-link sidebar-mobile-toggle d-lg-none mr-auto">
            <i class="fa fa-bars"></i>
        </a>

        <ul class="navbar-nav ml-auto rt-menu">
            <li class="nav-item d-md-down-none d-flex align-items-center justify-content-center">
                <div class="info d-flex align-items-center justify-content-center flex-column">
                    <div class="title">Tarif_1</div>
                    <div class="subtitle text-center">Ваш тарифний план</div>
                </div>
            </li>
            <li class="nav-item d-md-down-none d-flex align-items-center justify-content-center">
                <div class="info d-flex align-items-center justify-content-center flex-column">
                    <div class="title">Price грн</div>
                    <div class="subtitle text-center">Price 2</div>
                </div>
            </li>
            <li class="nav-item d-md-down-none d-flex align-items-center justify-content-center">
                <div class="info d-flex align-items-center justify-content-center flex-column">
                    <div class="title">
                        2024
                    </div>
                    <div class="subtitle text-center">
                        До сплати на {{\Carbon\Carbon::now()->format('d.m.Y')}}
                    </div>
                </div>
            </li>

        </ul>
    </nav>
    <div class="main-container">
        <div class="sidebar">
            <nav class="sidebar-nav open">
                <ul class="nav">
                    <li class="nav-item">
                        <a href="http://google.com"
                           class="nav-link">
                            Головна
                        </a>
                    </li>

                </ul>
            </nav>
        </div>

        <div class="content">
            <div class="container-fluid">
                <div class="container">
                    @yield('content')
                </div>
            </div>
        </div>
    </div>
</div>
<footer class="footer row m-0">
    <div class="col-xl-3 col-lg-3 col-sm-6 text-center my-3">
        <a href="/home">
            <img src="" class="logo" alt="logo">
        </a>
    </div>
</footer>
</body>
</html>
