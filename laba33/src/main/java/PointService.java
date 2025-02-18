import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PointService {

    // Метод для проверки попадания в область
    public boolean isPointInArea(PointDTO point) {
        double x = point.getX();
        double y = point.getY();
        double r = point.getR();

        // Проверяем попадание точки в одну из областей (Треугольник, Прямоугольник, Круг)
        return (checkTriangle(x, y, r) || checkRectangle(x, y, r) || checkCircle(x, y, r));
    }

    // Логика проверки попадания в треугольник
    private boolean checkTriangle(double x, double y, double r) {
        return (x >= 0 && y >= 0 && y <= -x + r/2);
    }

    // Логика проверки попадания в прямоугольник
    private boolean checkRectangle(double x, double y, double r) {
        return (x >= 0 && x <= r && y <= 0 && y >= -r / 2);
    }

    // Логика проверки попадания в круг
    private boolean checkCircle(double x, double y, double r) {
        return (x <= 0 && y >= 0 && (x * x + y * y <= r * r));
    }

    // Метод для валидации данных (X, Y, R)
    public boolean validatePoint(PointDTO point) {
        return checkX(point.getX()) && checkY(point.getY()) && checkR(point.getR());
    }

    private boolean checkX(double x) {
        return x == -4 || x == -3 || x == -2 || x == -1 || x == 0 || x == 1 || x == 2;
    }

    private boolean checkY(double y) {
        return y >= -3 && y <= 3;
    }

    private boolean checkR(double r) {
        return r == 1 || r == 1.5 || r == 2 || r == 2.5 || r == 3;
    }
}
