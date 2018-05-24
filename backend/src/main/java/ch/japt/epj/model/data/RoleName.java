package ch.japt.epj.model.data;

public enum RoleName {
  ROLE_TEACHER("ROLE_TEACHER", "/teacher", 0),
  ROLE_STUDENT("ROLE_STUDENT", "/participant", 1);

  private final String role;
  private final String path;
  private final int priority;

  RoleName(String role, String path, int priority) {
    this.role = role;
    this.path = path;
    this.priority = priority;
  }

  public int getPriority() {
    return priority;
  }

  public String getPath() {
    return path;
  }
}
