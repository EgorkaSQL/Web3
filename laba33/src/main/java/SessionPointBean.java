import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Named("sessionPointBean")
@SessionScoped
public class SessionPointBean implements Serializable {

    private List<PointDTO> points = new ArrayList<>();

    public List<PointDTO> getPoints() {
        return points;
    }

    public void setPoints(List<PointDTO> points) {
        this.points = points;
    }

    public void addPoint(PointDTO point) {
        this.points.add(point);
    }

    public void clearPoints() {
        this.points.clear();
    }
}
