import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;
import java.text.SimpleDateFormat;
import java.util.Date;

@Named
@ApplicationScoped
public class TimeBean {

    // Получаем текущее время в нужном формате
    public String getCurrentTime() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");
        return dateFormat.format(new Date());
    }
}
