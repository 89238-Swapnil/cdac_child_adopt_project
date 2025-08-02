package com.adoption.Service;

import com.adoption.dto.*;
import java.util.List;

public interface AdoptionFormService {
    AdoptionFormDTO submitForm(AdoptionFormDTO formDTO);
    AdoptionFormDTO getFormById(Long formId);
    List<AdoptionFormDTO> getFormsByParent(Long parentId);
    void deleteForm(Long formId);
}