import jakarta.inject.Inject;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;

import java.util.List;

@Named("pointBean")
@ApplicationScoped
public class PointBean {

    @Inject
    private PointService pointService;

    @Inject
    private DatabaseService databaseService;

    private double x;
    private double y;
    private double r;

    private List<PointDTO> points;

    // Getters and Setters
    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public List<PointDTO> getPoints() {
        return points;
    }

    public String submit() {
        PointDTO pointDTO = new PointDTO(x, y, r, false); // Изначально статус попадания false

        if (pointService.validatePoint(pointDTO)) {
            boolean hit = pointService.isPointInArea(pointDTO);
            pointDTO.setStatus(hit); // Устанавливаем статус попадания

            databaseService.addPoint(pointDTO); // Добавляем точку в БД
            points = databaseService.getAllPoints(); // Обновляем список точек
        }

        return "success";
    }

    public void clear() {
        databaseService.clearPoints();
        points.clear(); // Очистка списка точек
    }
}
